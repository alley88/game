class Comment{
    constructor(){
        this.container = $(".list-content")
    }
    init(){
        this.createContent();
    }
    createContent(){
        this.container.html(Comment.template)
        this.getBooksNameSelect();
        this.createwangEditor();
        this.public();
        
    }
    getBooksNameSelect() {
        $.ajax({
            type: "get",
            url: "/books/booksAll",
            success: this.handleGetBooksNameSelect.bind(this)
        })
    }
    handleGetBooksNameSelect(data) {
        var dataList = data.data.data;
        var str = "";
        for (var i = 0; i < dataList.length; i++) {
            str += `
                <option value="${dataList[i]._id}">${dataList[i].booksName}</option>
           `
        }
        $(".booksList").html(str);
        this.getCommentList();
        this.togglebooksList();
      
    }
    createwangEditor(){
        this.Editor =  new wangEditor("#content");
        this.Editor.create();
    }
    public(){
        $(".public").on("click",this.handlePublicCb.bind(this))
    }
    handlePublicCb(){
        var content =  this.Editor.txt.text();
        var booksId = $(".booksList").val();
        var userInfo = JSON.parse(window.sessionStorage.getItem("userinfo"));
        
        $.ajax({
            type:"post",
            url:"/comment/add",
            data:{
                userId:userInfo._id,
                Nickname:userInfo.Nickname,
                userPic:userInfo.userPic,
                booksId,
                content
            },
            success:this.handlePublicSucc.bind(this)
        })
    }
    handlePublicSucc(data){
       if(data.data.code === 200){
           $("#addArticle").hide();
           this.getCommentList();
       }
    }
    getCommentList(){
        var booksInfo = $(".booksList").val();
        $.ajax({
            type:"get",
            url:"/comment/getCommentList",
            data:{
                booksInfo
            },
            success:this.handleGetCommentListSucc.bind(this)
        })
    }
    handleGetCommentListSucc(data){
       var dataList = data.data.data;
        var str = "";
       for(var i=0;i<dataList.length;i++){
            str += `
            <div class="commentList_item">
            <div>
                <div class="userPic">
                    <img src="${dataList[i].userPic}"/>
                </div>
                <div class="usename">${dataList[i].Nickname}</div>
            </div>
            <div>${dataList[i].content}</div>
            <div>${moment(dataList[i].date).format("YYYY-MM-DD HH:MM:SS")}</div>
        </div>
            `
       }

       $(".commentList").html(str);
    }
    togglebooksList(){
        $(".booksList").on("change",this.handleToggleBooksListChange.bind(this))
    }
    handleToggleBooksListChange(){
        this.getCommentList();
    }
    
}
Comment.template =`
<div class="ArticleAction">
<div class="form-inline">
    <select class="form-control booksList">
       
    </select>
    <button class="btn btn-primary" data-toggle="modal" data-target="#addArticle">写评论</button>
</div>
    <div class="commentList">
        <div class="commentList_item">
            <div>
                <div class="userPic">
                    <img src="http://10.60.15.150:3000/img/1578973889746-1.bmp"/>
                </div>
                <div class="usename">aaa</div>
            </div>
            <div>1111</div>
            <div>2019:11:11</div>
        </div>
    </div>
    <div class="modal fade" id="addArticle" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title" id="myModalLabel">写评论</h4>
                </div>
                <div class="modal-body">
                   
                        <div class="form-group">
                            <label for="articleTitle">写评论</label>
                            <div id="content"></div>
                         </div>
                         <button type="button" class="btn btn-primary public">发布</button>
                </div>
                </div>
            </div>
    </div>
</div>
`