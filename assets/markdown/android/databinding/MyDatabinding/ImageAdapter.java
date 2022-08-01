package com.example.smartcity44.utils.MyDatabinding;

import android.content.Intent;
import android.widget.ImageView;

import androidx.databinding.BindingAdapter;

import com.bumptech.glide.Glide;
import com.example.smartcity44.util.OkHttpUtil;

public class ImageAdapter {

    @BindingAdapter("imgUrl")
    public static void loadurl(ImageView imageView,Object url){
        if(url instanceof Integer){
            imageView.setImageResource((Integer) url);
        }else{
            Glide.with(imageView).load(OkHttpUtil.getBaseUrl()+url).into(imageView);
        }
    }


}
