package com.example.smartcity44.utils.MyDatabinding;

import android.view.View;

import androidx.annotation.NonNull;
import androidx.databinding.ViewDataBinding;
import androidx.recyclerview.widget.RecyclerView;

public class MyViewHolder<T extends ViewDataBinding> extends RecyclerView.ViewHolder {
    T databinding;

    public MyViewHolder(T databinding) {
        super(databinding.getRoot());
        this.databinding = databinding;
    }

    public T getDatabinding() {
        return databinding;
    }
}
