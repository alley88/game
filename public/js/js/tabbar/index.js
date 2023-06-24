class SliderBar {
    constructor() {
        this.TabBar = $(".list-sliderBar>ul>li");
    }
    init() {
        this.TabBarToggle()
        this.handleTabBarCb(6);
        this.setUsername();
        this.logout();
    }
    TabBarToggle() {
        this.TabBar.each(this.handleTabBarEach.bind(this))
    }
    handleTabBarEach(index) {
        this.TabBar.eq(index).on("click", this.handleTabBarCb.bind(this, index))
    }
    handleTabBarCb(index) {
        this.TabBar.eq(index).addClass("active").siblings().removeClass("active");

        switch (index) {
            case 0:
                new Home().init();
                break;
            case 1:
                new AddBooks().init();
                break;
            case 2:
                new BooksAction().init();
                break;
            case 3:
                new UsersAction().init();
                break;
            case 4:
                new ArticleAction().init();
                break;
            case 5:
                new Mine().init();
            case 6:
                new Comment().init();
                break;

        }
    }
    setUsername(){
        let userInfo = JSON.parse(window.sessionStorage.getItem("userinfo"))
        $(".nav-username>span").eq(0).text(userInfo.Nickname)
    }
    logout(){
        $("#logout").on("click",this.handleLogout.bind(this))
    }
    handleLogout(){
       $.ajax({
           type:"get",
           url:"/users/logout",
           success:this.handleLogoutSucc.bind(this)
       })
    }
    handleLogoutSucc(data){
        if(data.data.code == 1){
            window.sessionStorage.removeItem("userinfo");
            window.location.href="http://10.60.15.150:3000"
        }
    }
}

new SliderBar().init();