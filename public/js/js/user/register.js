class Register {
    constructor(container) {
        this.container = container;
    }
    init() {
        this.createContent();
    }
    createContent() {
        this.container.html(Register.template);
        this.toggleContent();
        this.createCaptch();
        this.userRegister();
    }
    toggleContent(){
        $("#user_register .text-success").on("click",this.handleToggleContentCb.bind(this))
    }
    handleToggleContentCb(){
        new Page().createContent(true);
    }
    createCaptch(){
        $.ajax({
            type:"get",
            url:"/users/captch",
            success:this.handleCreateCaptchSucc.bind(this)
        })
    }
    handleCreateCaptchSucc(data){
        $(".captch>svg").remove();
        $(".captch").append(data.data);
        this.randomCaptch();
    }
    randomCaptch(){
        $(".captch>svg").on("click",this.handlerandomCaptchCb.bind(this))
    }
    handlerandomCaptchCb(){
        this.createCaptch();
    }
    userRegister(){
        $("#user_register").on("submit",this.handleUserRegisterCb.bind(this))
    }
    handleUserRegisterCb(e){
        e.preventDefault();
        var username = $("#user_register_username").val();
        var password = $("#user_register_password").val();
        var captch = $("#user_register_captch").val();
        
        $.ajax({
            type:"post",
            url:"/users/register",
            data:{
                username,
                password,
                captch
            },
            success:this.handleRgisterSucc.bind(this)
        })
    }
    handleRgisterSucc(data){
        if(data.data.code == 1){
            alert("注册成功");
            new Page().createContent(false);
        }else{
            alert(data.data.info);
            window.location.reload();
        }
    }
}

Register.template = `
<div id="container">
            <div class="logo">
                <img src="https://cas.1000phone.net/cas/images/login/logo.png">
            </div>
            <form id="user_register">
                <div class="form-group">
                    <label for="user_register_username">用户名</label>
                    <input type="text" class="form-control" id="user_register_username" placeholder="请输入用户名">
                </div>
                <div class="form-group">
                    <label for="user_register_password">密码</label>
                    <input type="password" class="form-control" id="user_register_password" placeholder="Password">
                </div>
                <div class="form-group">
                    <label for="user_register_password">验证码</label>
                    <div class="captch">
                        <input type="text" class="form-control" id="user_register_captch" placeholder="验证码">
                    </div>
                </div>
                <p class="text-success">已有账号,立即登录</p>
                <button type="submit" class="btn btn-primary user_btn">注册</button>
            </form>
        </div>
`