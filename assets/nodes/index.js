const fs = require('fs');
const path = require('path');
const express = require('express');
const exStatic = require('express-static');
const app = express();
const rootdir = path.join(__dirname,'../../');
const request = require('request');
var num = 0;
app.get('/',(req,res)=>{
    fs.readFile(path.join(rootdir,'home.html'),'utf8',(eer,datasrer)=>{
        var date = new Date();
        console.log("["+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds()+"] 有人访问了主页，累计"+ ++num);
        res.send(datasrer)
    });
})
app.get('/path',(req,res)=>{
    fs.readFile(req.query.path,'utf8',(eer,datasrer)=>{
        var md = require('markdown-it')();
        var result = md.render(datasrer+"");
        res.send(result)
    });
})
app.get('/test',(req,res)=>{
    res.send("连接成功")
})
var token  = "";
app.get('/getCommitMessage',(req,res)=>{
    var options = {
        'method': 'POST',
        'url': 'https://gitee.com/oauth/token?grant_type=password&refresh_token=907739b8c4b64c22bac956bf9eaa43c7&username=oDlime&password=r500st0e5163&client_id=5a90ac75b569004c942b95bf36f99d74a1d615862c0873dd040c889f7a7afc7d&client_secret=d066aa6a861276ed9d4712833204f17899d776ff6bd4790d3a768979c9bc2337&scope=user_info',
        'headers': {}
    };
    request(options, function (error, response) {
        if (error) throw new Error(error);
        var content = JSON.parse(response.body);
        token = content.access_token;
        continuerun();
    });
    function continuerun(){
        var options = {
            'method': 'GET',
            'url': 'https://gitee.com/api/v5/networks/oDlime/myBundle/events?access_token='+token,
            'headers': {
            }
        };
        request(options, function (error, response) {
            if (error) throw new Error(error);
            var content = JSON.parse(response.body);
            var commitdate = "";
            var committime = "";
            var commitMessageList = [];
            for (let i = 0; i < 10; i++) {
                if(true){
                    for (let j = 0; j < content[i].payload.commits.length; j++) {
                        commitdate = content[i].created_at.split('T')[0];
                        committime = content[i].created_at.split('T')[1].split('\+')[0];
                        var item = {
                            message:content[i].payload.commits[j].message,
                            commitdate:commitdate,
                            committime:committime
                        }
                        commitMessageList.push(item);
                    }
                }
            }
            res.send(JSON.stringify(commitMessageList));
        });
    }
})
app.get('/dir',(req,res)=>{
    fs.readdir(path.join(rootdir,'\\assets\\markdown'),function(err,files){
        var floder = [];
        (function iterator(i){
            if(i==files.length){
                res.send(JSON.stringify(floder))
                return;
            }
            fs.stat(path.join(rootdir,'assets/markdown/')+files[i],function(err,stats){
                if(stats.isDirectory()){
                    floder.push(files[i]);
                }
                iterator(i+1);
            })
        })(0)
    })
})
/**
 * 函数作用: 初始化
 * @returns 处理完的对象
 */
function initFun() {
    let dirPath = path.join(__dirname,"../../","assets","markdown")
    let all = {
        'name': "test",
        "children":[],
        'type': 'folder',
        'dirPath': dirPath
    }
    // 文件数组
    let res = fs.readdirSync(dirPath);
    //all里的children数组
    let temp = getFileJson(res, all.children, dirPath)
    all.children = temp;
    return all
}
/**
 * @param {A路径下的文件数组} res
 * @param {children数组} arr
 * @param {A路径} dir
 * @returns children数组
 */
function getFileJson(res,arr,dir) {
    res.map(item => {
        let tempDir = `${dir}/${item}`;
        let obj = newObj(tempDir,item)
        arr.push(obj);
        if(obj.children?.length == 0) {
            let dirValArr = fs.readdirSync(tempDir);
            return getFileJson(dirValArr,obj.children, obj.dirPath)
        }
    })
    return arr
}
// 处理该目录下生成的obj是否带有children
/**
 * 处理添加到children数组下的对象属性
 * @param {B路径 = A路径 + 文件名} tempDir
 * @param {文件名} item
 * @returns 返回处理好的对象
 */
function newObj(tempDir,item) {
    let obj = {
        name: item,
        dirPath: tempDir
    }
    //判断路径是否为文件夹
    if(! fs.statSync(tempDir).isFile()){
        obj.children = [];
        obj.type = 'folder'
    }
    return obj
}
app.get('/getFileTree', async (req, res) => {
    let fileJson = await initFun();
    // 将对象转成JSON格式
    res.send(JSON.stringify(fileJson));
});

app.use(exStatic(rootdir));
app.listen(30030,()=>{
    console.log("服务器在30030端口上打开。http://127.0.0.1:30030");
})