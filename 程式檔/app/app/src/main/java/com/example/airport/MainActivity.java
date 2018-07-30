package com.example.airport;

import android.app.Notification;
import android.app.NotificationManager;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.view.Menu;
import android.view.MenuItem;
import android.widget.ImageView;
import android.widget.TextView;
import com.estimote.coresdk.common.requirements.SystemRequirementsChecker;
import com.estimote.coresdk.observation.region.beacon.BeaconRegion;
import com.estimote.coresdk.recognition.packets.Beacon;
import com.estimote.coresdk.recognition.packets.EstimoteTelemetry;
import com.estimote.coresdk.service.BeaconManager;
import java.util.List;
import java.util.UUID;

public class MainActivity extends AppCompatActivity {

////  多個beacon使用
//    private static final Map<String, List<String>> PLACES_BY_BEACONS;
//
//    // TODO: replace "<major>:<minor>" strings to match your own beacons.
//    static {
//        Map<String, List<String>> placesByBeacons = new HashMap<>();
//        placesByBeacons.put("22504:48827", new ArrayList<String>() {{
//            add("Heavenly Sandwiches");
//            // read as: "Heavenly Sandwiches" is closest
//            // to the beacon with major 22504 and minor 48827
//            add("Green & Green Salads");
//            // "Green & Green Salads" is the next closest
//            add("Mini Panini");
//            // "Mini Panini" is the furthest away
//        }});
//        placesByBeacons.put("648:12", new ArrayList<String>() {{
//            add("Mini Panini");
//            add("Green & Green Salads");
//            add("Heavenly Sandwiches");
//        }});
//        PLACES_BY_BEACONS = Collections.unmodifiableMap(placesByBeacons);
//    }
//
//    private List<String> placesNearBeacon(Beacon beacon) {
//        String beaconKey = String.format("%d:%d", beacon.getMajor(), beacon.getMinor());
//        if (PLACES_BY_BEACONS.containsKey(beaconKey)) {
//            return PLACES_BY_BEACONS.get(beaconKey);
//        }
//        return Collections.emptyList();
//    }

    private BeaconManager beaconManager;
    private BeaconRegion region;
    private TextView txtName;
    private ImageView imgStatus;
    private int staytimes;
    private  double distance;

    // TODO:目前Power= 0 dBm

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        initializeControls();



        beaconManager = new BeaconManager(this);
//        beaconManager.setTelemetryListener(new BeaconManager.TelemetryListener() {
//            @Override
//            public void onTelemetriesFound(List<EstimoteTelemetry> telemetries) {
//                for (EstimoteTelemetry tlm : telemetries) {
//                    Log.d("temperature", "beaconID: " + tlm.deviceId +
//                            ", temperature: " + tlm.temperature + " °C");
//                    //Set text values
//
//                }
//            }
//        });


        beaconManager.setRangingListener(new BeaconManager.BeaconRangingListener() {

            @Override
            public void onBeaconsDiscovered(BeaconRegion beaconRegion, List<Beacon> beacons) {
                if (!beacons.isEmpty()) {
                    Beacon nearestBeacon = beacons.get(0);
////                  多個beacon使用
//                    List<String> places = placesNearBeacon(nearestBeacon);


                    // TODO: 若有兩位使用者的情況還未測試調整 以及 距離ＲＳＳＩ(ＧＥＴ)設定接收範圍
                    // TODO: 值為-00dBm 若值越接近0 距離越近 RSSI_get

//                    distance = computeAccuracy(nearestBeacon.getRssi(), nearestBeacon.getMeasuredPower());

                    ColRSSI(nearestBeacon.getRssi(), nearestBeacon.getMeasuredPower());

                    Log.d("chugetRssi", String.valueOf(nearestBeacon.getRssi()));
                    Log.d("chugetMP", String.valueOf(nearestBeacon.getMeasuredPower()));
                    Log.d("chuDistance", String.valueOf(distance));

                    if(distance < 10) {
                        imgStatus.clearAnimation();
                        txtName.setText("beacon immediate");
                        imgStatus.setImageResource(R.mipmap.placeholder);
                        Log.d("chuUUID", "Nearest places: " + nearestBeacon.getProximityUUID().toString());
                        //停留時間累計超過
                        staytimes += 1;
                        if (staytimes == 10) {
                            showNotification(
                                    "★★★歡迎光臨國立暨南大學★★★",
                                    "畢業季開跑" +
                                            "清涼一夏請參閱暨大游泳池\uD83D\uDC97\n" +
                                            "\uD83D\uDE9B圖書館營業至下午九點");

                            //轉到臉書登入頁面
                            Intent intent = new Intent();
                            intent.setClass(MainActivity.this, FaceBActivity.class);
                            startActivity(intent);
                        }
                    }
                    else {
                        txtName.setText("beacon near, please be closer");
                    }

                }
                else
                {
                    txtName.setText("unknown beacon");
                    imgStatus.setImageResource(R.mipmap.search);
                    //防感應不良
                    int noBeaconTime = 0;
                    noBeaconTime += 1;
                    if(noBeaconTime > 30)
                        staytimes = 0;
                }

            }
        });

        region = new BeaconRegion("ranged region", UUID.fromString("D0D3FA86-CA76-45EC-9BD9-6AF4C2A616B3"), null, null);
    }

    private void initializeControls(){
        txtName = (TextView)findViewById(R.id.beaconStatus);
        imgStatus = (ImageView)findViewById(R.id.img_beaconStatus);

    }

    @Override
    protected void onResume() {
        super.onResume();
        SystemRequirementsChecker.checkWithDefaultDialogs(this);

        beaconManager.connect(new BeaconManager.ServiceReadyCallback() {
            @Override
            public void onServiceReady() {
                beaconManager.startRanging(region);
            }
        });
    }

    @Override
    protected void onPause() {
        beaconManager.stopRanging(region);

        super.onPause();
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.menu_main, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // Handle action bar item clicks here. The action bar will
        // automatically handle clicks on the Home/Up button, so long
        // as you specify a parent activity in AndroidManifest.xml.
        int id = item.getItemId();

        //noinspection SimplifiableIfStatement
        if (id == R.id.action_settings) {
            return true;
        }

        return super.onOptionsItemSelected(item);
    }

//    @Override
//    protected void onStart() {
//        super.onStart();
//        Log.d("TAG", "onStart TelemetryDiscovery");
//        beaconManager.connect(new BeaconManager.ServiceReadyCallback() {
//            @Override
//            public  onServiceReady() {
//                 scanId = beaconManager.startTelemetryDiscovery();
//            }
//        });
//    }
//
//    @Override
//    protected void onStop() {
//        super.onStop();
//        Log.d("TAG", "onStop TelemetryDiscovery");
//        beaconManager.stopTelemetryDiscovery(scanId);
//    }

    public  void ColRSSI(int rssi_val,int txPower){

        if (txPower == 0) {
            txPower = -1;
        }
        //RSSI = −(10 × n)log10(d) − A  //n is 信號傳播常數或指數
        distance = Math.pow(10d, ((double)txPower - rssi_val) / (10 * 2.25));

    }

      //Estimote beacon colculate distance, but use in iPhone or other type smartphone will be better
//    private static double computeAccuracy(int rssi, int measuredPower) {
//        if(rssi == 0) {
//            return -1.0D;
//        } else {
//            double ratio = (double)rssi / (double)measuredPower;
//            double rssiCorrection = 0.96D + Math.pow((double)Math.abs(rssi), 3.0D) % 10.0D / 150.0D;
//            return ratio <= 1.0D?Math.pow(ratio, 9.98D) * rssiCorrection:(0.103D + 0.89978D * Math.pow(ratio, 7.71D)) * rssiCorrection;
//        }
//    }

    //通知久留顧客廣告
    public void showNotification(String title, String message) {

        Notification notification = new Notification.Builder(this)
                .setSmallIcon(android.R.drawable.ic_dialog_info)
                .setContentTitle(title)
                .setContentText(message)
                .setAutoCancel(true)
                .build();
        notification.defaults |= Notification.DEFAULT_SOUND;
        NotificationManager notificationManager =
                (NotificationManager) getSystemService(Context.NOTIFICATION_SERVICE);
        notificationManager.notify(1, notification);
    }
}
