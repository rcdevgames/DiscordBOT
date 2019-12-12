var request = require('request');
msg.channel.send("Perae mano xo procura um comentario aq");
const axios = require('axios');
const api = axios.create({
    baseURL : "https://www.xvideos.com/threads/video-comments/get-posts/top/"
});

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }


 function getXVideosComment(){
    var rand = getRandomInt(1,30);
    request({
        uri: `https://www.xvideos.com/lang/portugues/${rand}`,
    
    }, (error,response,body) => {
    
        let x = body.match(/xv\.thumbs\.prepareVideo\(([0-9]+)\);/);
        let id = x[1];
        async function getcomment(){
            //console.log("retry");
            console.log(id,rand)
            var comment = await api.get(`${id}/0/0`);
            if(comment.data.posts.nb_posts_total == 0){
                getXVideosComment();
            }else{
                var maxLen = Object.keys(comment.data.posts.posts).length
                let randC = getRandomInt(0,maxLen-1);
               var obj = Object.entries(comment.data.posts.posts);
                if(obj[randC][1].message.includes("&")){
                    getXVideosComment();
                }else{
                    msg.channel.send(`${obj[randC][1].message} https://www.xvideos.com/video${id}`)
                }

            }
            
        }
        getcomment();
    });
    }
    getXVideosComment()