module.exports=function(router,passport){
    console.log('user_passport 호출됨');
    
    //홈 화면=로그인 화면
    router.route('/').get(function(req,res){
        console.log('/ 패스 요청됨.');
        if(req.user){
            console.log("이미 로그인된 상태임");
            if(Array.isArray(req.user)){
                res.render('main.ejs',{user:req.user[0]});
            }
            else{
                res.render('main.ejs',{user:req.user});
            }
        }
        res.render('entrance.ejs',{message:req.flash('loginMessage')});
    });
    
    //로그인 화면
    router.route('/login').get(function(req,res){
        console.log('/login 패스 요청됨.');
        res.render('entrance.ejs',{message:req.flash('loginMessage')});
    });
    
    //회원가입 화면
    router.route('/signup').get(function(req,res){
        console.log('/signup 패스 요청됨');
        res.render('signup.ejs', {message: req.flash('signupMessage')});
    });
    
    //로그인 후 메인 화면
    router.route('/main').get(function(req,res){
        console.log('/main 패스 요청됨');
        
        console.dir(req.user);
        //인증이 안 된 경우
        if(!req.user){
            console.log('사용자 인증이 안 된 상태임');
            res.redirect('/');
            return;
        }
    
        //인증된 경우
        console.log('사용자 인증된 상태임.');
        if(Array.isArray(req.user)){
            res.render('main.ejs',{user:req.user[0]});
        }
        else{
            res.render('main.ejs',{user:req.user});
        }
    });
    
    //헤더 바로가기 3개 루트
    //내 프로필 화면
    router.route('/profile').get(function(req,res){
        console.log('/profile 패스 요청됨');
        
        console.log('req.user 객체의 값');
        console.dir(req.user[0]);
       
        //인증이 안 된 경우
        if(!req.user){
            console.log('사용자 인증이 안 된 상태임');
            res.redirect('/');
            return;
        }
    
        //인증된 경우
        console.log('사용자 인증된 상태임.');
        if(Array.isArray(req.user)){
            res.render('profile.ejs',{user:req.user[0]});
        }
        else{
            res.render('profile.ejs',{user:req.user});
        }
        

    });
    
    //내 쪽지함 화면
    router.route('/message').get(function(req,res){
        console.log('/message 패스 요청됨');
       
        //인증이 안 된 경우
        if(!req.user){
            console.log('사용자 인증이 안 된 상태임');
            res.redirect('/');
            return;
        }
    
        //인증된 경우
        console.log('사용자 인증된 상태임.');
        if(Array.isArray(req.user)){
            res.render('message.ejs',{user:req.user[0]});
        }
        else{
            res.render('message.ejs',{user:req.user});
        }
    });
    
    //로그아웃
    router.route('/logout').get(function(req,res){
        console.log('/logout 패스 요청됨');
        req.logout();
        res.redirect('/');
    });

    //로그인 시도
    router.route('/login').post(passport.authenticate('local_login',{
        successRedirect :'/main',
        failureRedirect : '/login',
        failureFlash :true
    }));


    //회원가입 시도
    router.route('/signup').post(passport.authenticate('local_signup',{
        successRedirect:'/main',
        failureRedirect:'/signup',
        failureFlash:true
    }));
    
};