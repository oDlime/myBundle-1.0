package com.example.smartcity44.utils.MyDatabinding;

import android.content.Context;
import android.content.Intent;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;

import androidx.annotation.NonNull;
import androidx.databinding.DataBindingUtil;
import androidx.databinding.ViewDataBinding;
import androidx.recyclerview.widget.RecyclerView;

import com.example.smartcity44.BR;
import com.example.smartcity44.R;
import com.example.smartcity44.activity.MovieActivity;
import com.example.smartcity44.activity.XuanzuoActivity;

import java.util.List;

public class MyrydataAdapter<T> extends RecyclerView.Adapter<MyViewHolder> {

    Context context;
    int res;//子布局
    List<T> list;
    int len;
    LayoutInflater layoutInflater;

    public MyrydataAdapter(Context context, int res, List<T> list, int len) {
        this.context = context;
        this.res = res;
        this.list = list;
        this.len = len;
        layoutInflater = LayoutInflater.from(context);
    }

    @NonNull
    @Override
    public MyViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        return new MyViewHolder(DataBindingUtil.inflate(layoutInflater,res,parent,false));
    }

    @Override
    public void onBindViewHolder(@NonNull MyViewHolder holder, int position) {
        int pos = position;
        ViewDataBinding dataBinding = holder.getDatabinding();
        dataBinding.setVariable(BR.movie,list.get(position));
        if(res == R.layout.movie_list_item){
            View root = dataBinding.getRoot();
            root.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View view) {
                    rootclick.rclick(root,pos);
                }
            });
        }
        dataBinding.executePendingBindings();

        //影厅
        dataBinding.setVariable(BR.yingting,list.get(position));
        if(res == R.layout.recy_yingting_item){
            View root = dataBinding.getRoot();
            Button button = root.findViewById(R.id.button);
            button.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View view) {
                    Intent intent = new Intent(context, XuanzuoActivity.class);
                    context.startActivity(intent);
                }
            });
        }
        dataBinding.executePendingBindings();
        //影厅2
        dataBinding.setVariable(BR.movecang,list.get(position));
        if(res == R.layout.movie_recy_item){
            View view = dataBinding.getRoot();
            view.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View view) {
                    rootclick.rclick(view,pos);
                }
            });
        }
        dataBinding.executePendingBindings();

    }
    @Override
    public int getItemCount() {
        return len==0?0:len;
    }


    public interface Rootclick{
        void rclick(View root,int position);
    }
    Rootclick rootclick;
    public void setRootclick(Rootclick rootclick) {
        this.rootclick = rootclick;
    }
}
