# Project Title 

**[Personal Diary]**  

웹 페이지를 이용하여 일기 작성이 가능한 Personal Diary 입니다. Flask와 SQLAlchemy를 이용하여 구현하였으며, 로그인 및 회원가입이 가능하며, 일기 작성시에는 그림 삽입, 삭제와 같은 관리가 가능합니다.
<br/><br/>



# About

본 프로젝트는 대학교 3학년 소프트웨어 공학 및 설계 과목에서 진행하였습니다.   
개인 프로젝트였고, 프로젝트 기간은 2020.05 ~ 2020.07 입니다.

<br/>
<br/>

본 프로젝트를 웹 페이지로 구현하기 위해 Flask를 이용하였으며, Flask를 이용한 이유는 다음과 같습니다.

* Python 언어를 가장 잘하고, 친숙해서 Python 언어를 기반으로 하는 Web Framework를 선택했습니다.

* Django 대신 Flask를 선택한 이유는,  
Flask는 <a href="https://ko.wikipedia.org/wiki/%EB%A7%88%EC%9D%B4%ED%81%AC%EB%A1%9C%ED%94%84%EB%A0%88%EC%9E%84%EC%9B%8C%ED%81%AC" target="_blank">Microframework </a>이고 편하게 확장할 수 있으며, 보다 유연합니다. 그래서 저는 처음 Web Framework를 사용해보기에 Flask가 프로젝트를 구현하는데 유리하다 생각했습니다.


<br/><br/>
회원가입이나 로그인과 같은 DB가 필요한 기능에는 SQLAlchemy를 사용하였는데 그 이유는 다음과 같습니다.

DB를 구축하는데에 있어 ORM 방식이 유리하다고 생각하였는데,

### ORM 이란?

ORM(Object Relational Mapping)의 약자로 데이터베이스 내의 리소스(테이블)들을 객체화하여, 각 DBMS들에 대해서 CRUD 등을 공통된 접근기법으로 사용할 수 있습니다. 대표적인 Python ORM은 Django ORM 및 SQLAlchemy 등이 있습니다.

#### ORM 장점
* 프로그래머는 DBMS에 대한 큰 고민없이, ORM에 대한 이해만으로 웬만한 CRUD를 다룰 수 있기 때문에, 비즈로직에 집중할 수 있으므로 개발 생산성을 증가시킬 수 있습니다.

* 객체를 통하여 대부분의 데이터를 접근 및 수정을 진행하므로, 코드 가독성이 좋습니다.

* 데이터 구조 변경시, 객체에 대한 변경만 이루어지면 되므로, 유지보수성이 좋습니다.

<br/>

#### ORM 단점
* 복잡한 쿼리 작성시, ORM 사용에 대한 난이도가 급격히 증가합니다.

* 호출 방식에 따라, 성능이 천차만별입니다.

* DBMS 고유의 기능을 전부 사용하지는 못합니다.


<br/>

객체지향에 대한 공부 및 코드의 가독성과 같은 이점 때문에 ORM 방식을 사용하기로 하였습니다.

Flask는 Django와 달리 자체 ORM이 따로 없기 때문에 SQLAlchemy를 이용하여 구현하였습니다.



<br/><br/>


# 코드 설명
### 텍스트 요약

```
@app.route('/', methods=['GET', 'POST'])
def home():
  if not session.get('logged_in'):
    return render_template('login_regist_form.html')
  else:
    if request.method == 'POST':
      username = request.form['username']
      return render_template('login_regist_form.html', data=blogopen(username))
    return render_template('login_regist_form.html')
```

로그인을 할 수 있는 첫 화면입니다. ***login_regist_form.html***은 로그인과 회원가입을 할 수 있는 화면이자, 웹 페이지를 열었을 때 처음보이는 화면입니다.

***logged_in***을 통해 로그인이 되어있는지 확인합니다.


<br/><br/><br/><br/>
```
@app.route('/login', methods=['GET', 'POST'])
def login():
	"""Login Form"""
	if request.method == 'GET':
		return render_template('login_regist_form.html')
	else:
		name = request.form['username']
		passw = request.form['password']
		try:
			data = User.query.filter_by(username=name, password=passw).first()
			if data is not None:
				session['logged_in'] = True
				return render_template('index.html', namehtml = name);
			else:
				flash("입력하신 ID나 비밀번호가 일치하지 않습니다.")
				return render_template('warning1.html')
		except:
			return render_template('warning1.html')
```

***request***를 통해 ***username***과 ***password***를 받고,  

 DB에 아이디와 패스워드 데이터가 존재한다면 로그인에 성공합니다.

반대로 데이터가 존재하지 않는다면 ***flash***를 이용해 경고메세지를 보냅니다.


<br/><br/><br/><br/>
```
@app.route('/register/', methods=['GET', 'POST'])
def register():
	"""Register Form"""
	if request.method == 'POST':
		if request.form['password'] != request.form['password2']:			
			flash("Password와 Password2가 일치하지 않습니다.")
			return render_template('warning1.html')
				
		new_user = User(username=request.form['username'], password=request.form['password'], 
			email=request.form['email'])

		db.session.add(new_user)
		db.session.commit()
		return render_template('login_regist_form.html')
	return render_template('login_regist_form.html')
```

회원가입을 할 때 사용하는 코드입니다.

회원가입을 할 때 비밀번호를 두 번 입력하는데, 

1차 비밀번호와 2차 비밀번호를 다르게 설정하면 경고메세지를 보내도록 했습니다.

회원가입이 완료되면 ***new_user***라는 변수안에 ***username***, ***password***, ***email***을 넣고 DB에 저장하였습니다.


<br/><br/><br/><br/>
```
@app.route("/logout")
def logout():
	"""Logout Form"""
	session['logged_in'] = False
	return redirect(url_for('home'))
```

로그아웃을 할 때 사용하는 코드입니다.
***session['logged_in']*** 을 False로 바꿔주고,   
첫 화면으로 전환합니다.



<br/><br/><br/>





# Getting Started 



### Prerequisites

```
torch==1.7..1
transformers==4.3.3
pytorch-lightning==1.3.8
streamlit==0.72.0
```


## Running


### <img src="https://img.shields.io/badge/Anaconda-F48220?style=flat-square&logo=Anaconda&logoColor=White"/> Promt 환경에서 실행합니다

```
cd C:\Users\..\Desktop\summary_model
C:\Users\..\Desktop\summary_model> python app.py
```
<br/>

### 실행화면

![image](https://user-images.githubusercontent.com/60394246/154043322-2683ba2c-faea-4bdb-9fdc-388ba5c07aa1.png)


메세지 박스안에 요약하고자 하는 텍스트를 입력하면 됩니다.  
요약 모델은 요약 결과와 키워드를 제공합니다.
<br/><br/><br/><br/>

**원문**

![image](https://user-images.githubusercontent.com/60394246/154043035-d572f7d9-789e-4d6d-a4fc-5cc4ee047679.png)
<br/><br/><br/><br/>

### 실행 결과<br/>

![image](https://user-images.githubusercontent.com/60394246/154044732-307f75fc-b632-4cd4-a886-d5790f8d0ad3.png)


<br/><br/><br/>

## License / 라이센스

This project is licensed under the MIT License - see the [LICENSE](https://github.com/Jang-Seonguk/Capstone-Project/blob/56dc3090c50bd8899ccc59d2ab2cd36506449d51/LICENSE) file for details   
이 프로젝트는 MIT 라이센스가 부여되어 있습니다. 자세한 내용은 LICENSE 파일을 참고하세요.




