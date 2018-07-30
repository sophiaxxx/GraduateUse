package com.example.airport;

import android.content.Context;
import android.content.Intent;
import android.net.wifi.WifiManager;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import com.facebook.CallbackManager;
import com.facebook.FacebookCallback;
import com.facebook.FacebookException;
import com.facebook.FacebookSdk;
import com.facebook.GraphRequest;
import com.facebook.GraphRequestAsyncTask;
import com.facebook.GraphResponse;
import com.facebook.login.LoginManager;
import com.facebook.login.LoginResult;
import com.facebook.login.widget.LoginButton;
import org.json.JSONException;
import org.json.JSONObject;
import android.util.Log;
import android.view.View;
import android.widget.TextView;
import android.widget.Toast;
import java.io.IOException;
import java.net.DatagramPacket;
import java.net.InetAddress;
import java.net.MulticastSocket;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Date;


public class FaceBActivity extends AppCompatActivity {

    //facebookAPI variable
    TextView txtStatus, txtProfile, txtName;
    LoginButton login_button;
    CallbackManager callbackManager;
    private String TAG = "log:";
    String User_likes ="";

    //Multicast variable
    MulticastSocket multisocket;
    DatagramPacket dgramPacket;
    String msg ="";
    Boolean isMember = false;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_face_b);
        FacebookSdk.sdkInitialize(getApplicationContext());
        initializeControls();
        loginWithFB();


    }

    private void initializeControls(){
        callbackManager = CallbackManager.Factory.create();
        txtStatus = (TextView)findViewById(R.id.txtStatus);
        txtName = (TextView)findViewById(R.id.txtName);
        login_button = (LoginButton)findViewById(R.id.login_button);
        txtProfile = (TextView)findViewById(R.id.txtDetail);
    }


    //Facebook Login function
    private void loginWithFB(){

        LoginManager.getInstance().logInWithReadPermissions(this,
                Arrays.asList("public_profile", "user_likes", "user_birthday",
                                    "user_gender", "user_hometown", "groups_access_member_info"));

        LoginManager.getInstance().registerCallback(callbackManager, new FacebookCallback<LoginResult>() {
            @Override
            public void onSuccess(LoginResult loginResult) {
                login_button.setVisibility(View.INVISIBLE);

                GraphRequestAsyncTask ReqName = GraphRequest.newGraphPathRequest(loginResult.getAccessToken(),
                        "/me", new GraphRequest.Callback() {
                            @Override
                            public void onCompleted(GraphResponse response) {
                                try {
                                    JSONObject username = response.getJSONObject();
                                    txtName.setText(username.get("name").toString());

                                    SimpleDateFormat sdf = new SimpleDateFormat("a");
                                    Date currentTime = Calendar.getInstance().getTime();
                                    if(sdf.format(currentTime).toString() == "am")
                                        txtStatus.setText("Good Morning");
                                    else
                                        txtStatus.setText("Good Afternoon");

                                    //onBrodacastSend(response.getJSONObject());
                                    Log.i(TAG, "Username:" + username.get("name").toString());
                                } catch (JSONException e) {
                                    e.printStackTrace();
                                }
                            }
                        }
                ).executeAsync();


                GraphRequestAsyncTask ReqLikes = GraphRequest.newGraphPathRequest(loginResult.getAccessToken(),
                        "/me?fields=likes.limit(1000)", new GraphRequest.Callback() {
                            @Override
                            public void onCompleted(GraphResponse response) {
                                LikesResponse(response.getJSONObject());
                            }
                        }
                ).executeAsync();


                GraphRequestAsyncTask ReqGroups = GraphRequest.newGraphPathRequest(loginResult.getAccessToken(),
                        "/me?fields=groups.limit(1000)", new GraphRequest.Callback() {
                            @Override
                            public void onCompleted(GraphResponse response) {
                                GroupsResponse(response.getJSONObject());
                            }
                        }
                ).executeAsync();

                GraphRequestAsyncTask ReqProfile = GraphRequest.newGraphPathRequest(loginResult.getAccessToken(),
                        "/me?fields=id,name,birthday,hometown,gender,age_range", new GraphRequest.Callback() {
                            @Override
                            public void onCompleted(GraphResponse response) {
                                onBrodacastSend(response.getJSONObject());

                            }
                        }
                ).executeAsync();
            }

            @Override
            public void onCancel() {
                Toast.makeText(FaceBActivity.this, "Login Cancelled", Toast.LENGTH_LONG).show();

            }

            @Override
            public void onError(FacebookException error) {
                Toast.makeText(FaceBActivity.this, error.getMessage(), Toast.LENGTH_LONG).show();

            }
        });
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        callbackManager.onActivityResult(requestCode, resultCode, data);
        super.onActivityResult(requestCode, resultCode, data);
    }

    /**
     * onBrodacastSend() 發送
     */
    private void onBrodacastSend(final JSONObject user) {
        try {

            WifiManager wifi = (WifiManager) getApplicationContext().getSystemService(Context.WIFI_SERVICE);
            if (wifi != null){
                WifiManager.MulticastLock lock = wifi.createMulticastLock("mylock");
                lock.acquire();
            }

            // send dataFormat
            InetAddress group = InetAddress.getByName("224.4.4.4");
            multisocket = new MulticastSocket(12333);
            multisocket.joinGroup(group);

            String usrProfile ="";

            usrProfile = user.get("name").toString();

            //cal age
            if(user.isNull("birthday")!= true){
                String birthday = user.get("birthday").toString();

                SimpleDateFormat dateF = new SimpleDateFormat("dd/MM/yyyy");
                Date date = new Date();
                try {
                    date = dateF.parse(birthday);
                } catch (ParseException e) {
                    e.printStackTrace();
                }
                //cal birthyear
                Calendar birthcal = Calendar.getInstance();
                birthcal.setTime(date);
                int birthyear = birthcal.get(Calendar.YEAR);
                //cal nowyear
                Calendar cal = Calendar.getInstance();
                int nowyear = cal.get(Calendar.YEAR);
                usrProfile += "," + (nowyear- birthyear);
            }else
                usrProfile += "," +  user.getJSONObject("age_range").getString("min");

            if(user.isNull("gender")!= true)
                usrProfile += "," + user.get("gender");
            else
                usrProfile += ", \"null\"";

            usrProfile += "," + isMember;
            if(user.isNull("hometown") != true)
                usrProfile += "," + user.getJSONObject("hometown").getString("name");
            else
                usrProfile += ", \"null\"";

            String sendtext = usrProfile;
            msg = sendtext;
            Log.d("multisocketdata", msg);



            dgramPacket = new DatagramPacket(msg.getBytes(), msg.length(), group, 3333);


            new Thread(new Runnable() {
                @Override
                public void run() {
                    //if data update
                    while (true) {
                        try {

                            multisocket.send(dgramPacket);
                            // 每執行一次，休眠10s，然后繼續下一次任務
                            Thread.sleep(1000);

                            Log.d("multisocketdata", multisocket.toString());


                        } catch (InterruptedException e) {
                            Toast.makeText(FaceBActivity.this, e.toString(), Toast.LENGTH_LONG).show();
                        } catch (IOException e) {
                            Toast.makeText(FaceBActivity.this, e.toString(), Toast.LENGTH_LONG).show();
                        }
                    }

                }
            }).start();


        } catch (JSONException e) {
            Toast.makeText(FaceBActivity.this, e.toString(), Toast.LENGTH_LONG).show();
        } catch (IOException e) {
            Toast.makeText(FaceBActivity.this, e.toString(), Toast.LENGTH_LONG).show();
        }
    }



    //TODO:畫面-likes
    private void LikesResponse(JSONObject likes ) {
        try {
            JSONObject obj = likes.getJSONObject("likes");
            if (obj != null) {
                //是否為暨大的粉絲
                if(obj.get("data").toString().contains("暨大") ||
                        obj.get("data").toString().contains("暨南") ||
                            obj.get("data").toString().contains("ncnu") ||
                                obj.get("data").toString().contains("NCNU")){
                    //非暨大的成員
                    txtProfile.setText("歡迎蒞臨暨大，請觀看電視！");
                }
                else {
                    //非暨大的成員
                    txtProfile.setText("歡迎蒞臨暨大，請觀看電視！");
                }
            }
        } catch (JSONException e1) {
            e1.printStackTrace();
        }

    }


    //TODO:畫面-groups
    private void GroupsResponse(JSONObject groups ) {
        try {
            Log.d("EXOGroup", groups.toString());
            JSONObject obj = groups.getJSONObject("groups");
            if (obj != null) {
                //是暨大的成員
                if(obj.get("data").toString().contains("暨大") ||
                        obj.get("data").toString().contains("暨南") ||
                        obj.get("data").toString().contains("ncnu") ||
                        obj.get("data").toString().contains("NCNU")){
                    txtProfile.setText("暨大成員你好，請觀看電視！");
                    isMember = true;

                }
                else {
                    //非暨大的成員
                    txtProfile.setText("歡迎蒞臨暨大，請觀看電視！");
                    isMember = false;
                }
            }
        } catch (JSONException e1) {
            e1.printStackTrace();
        }

    }



}
