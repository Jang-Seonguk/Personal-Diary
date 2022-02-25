function getCookie(c_name)
{
	var i,x,y,ARRcookies=document.cookie.split(";");
	for (i=0;i<ARRcookies.length;i++)
	{
	  x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
	  y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
	  x=x.replace(/^\s+|\s+$/g,"");
	  if (x==c_name)
		{
		return unescape(y);
		}
	  }
}

function setCookie(c_name,value,exdays)
{
	var exdate=new Date();
	exdate.setDate(exdate.getDate() + exdays);
	var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
	document.cookie=c_name + "=" + c_value;
}

function delCookie(cookie_name) {
    setCookie(cookie_name, "", 0 , 0);
}



var i = 0;
var x = 0;

var check_username = document.getElementById('myVariable').value;


if (getCookie(check_username) > 0)
{
    i = parseInt(getCookie(check_username));
}
else{
    i = 0;
}


for (step = 0; step < i; step++) {

    if (getCookie(check_username+step) == "") {
        continue;
    }

    
    
    additional(getCookie(check_username+step), step, 'node', 'list');

    removeButton(step);

    doneBotton(step);

    
    Next(step, 'br', 'list');
    
    
}

function click_event()
{
    const d = new Date();
    
    var add = document.getElementById("input").value;
    var time = d.toLocaleDateString() + '      ' + d.toLocaleTimeString() + " - " ;
    
    if(!add)
    {
        alert('Please input your list');
    }
    else
    {
        add = document.getElementById("input").value;
        
        setCookie(check_username+i, add, 1);
        
        setCookie(check_username+i+'time', time, 1);
        additional(add, i, 'node', 'list');
        
        removeButton(i);

        doneBotton(i);
          
        Next(i, 'br', 'list');
        i++;

        setCookie(check_username, i, 1);
        
        
    }
}



function additional(text, n, id, spot)
{
    
    
    var node = document.createElement("SPAN");
    var textnode = document.createTextNode(getCookie(check_username+n+'time')+text);

    node.id = id + n;

    node.appendChild(textnode);
    document.getElementById(spot).prepend(node);
    
    node.onclick = function(){
        modify(node.id, getCookie(check_username+n+'time'), n);    
    }
    document.getElementById("input").value = "";
    
}

function doneBotton(n)
{
    
    var done_btn = document.createElement("BUTTON");
    done_btn.id = 'done' + n;
    done_btn.className="fas fa-camera";
    done_btn.style = "margin-bottom: 175px";
    
    document.getElementById("list").prepend(done_btn);

    done_btn.onclick = function(){
        
        x = n;
        const realInput = document.querySelector('#real-input').click();
        
        previewImage(realInput);
        

    };
}


function done(n)
{
    var value = document.getElementById('node' + n).innerHTML;
    
    additional(value, n, 'node_d', 'done');
        
    
    var remove_btn = document.createElement("BUTTON");
    remove_btn.id = 'bnt' + n;
    remove_btn.className="fas fa-minus";
    document.getElementById("done").prepend(remove_btn);

    remove_btn.onclick = function(){
        remove_d('node_d' + n, remove_btn.id, 'br_d' + n);
    };

    Next(n, 'br_d', 'done');
    remove(n);
}


function removeButton(n)
{
    var remove_btn = document.createElement("BUTTON");
    remove_btn.id = n;
    remove_btn.className="fas fa-trash-alt";
    remove_btn.onclick = function(){
        remove(remove_btn.id);
        setCookie(check_username+n, "", 1);
        

    };
    document.getElementById("list").prepend(remove_btn);
}


function remove(n)
{
    var arr = ['node', 'br', 'done', ''];

    for(var i = 0; i < 4; i++)
    {
        var b = document.getElementById(arr[i] + n);
        b.style.display = "none";
    }
    
}


function modify(spot, s, n)
{
    var value = prompt("Modify", "What is your list?");
    
    
    
    if(value)
    {
        document.getElementById(spot).innerHTML = s + value;
        setCookie(check_username+n, value, 1);
    }
}


function remove_d(node, bnt, br)
{
    var arr = [node, bnt, br];

    for(var i = 0; i < 3; i++)
    {
        var a = document.getElementById(arr[i]);
        a.style.display = "none";
    }
}


function Next(n, id, spot)
{
    
    var br = document.createElement("BR");
    br.id= id + n;
    document.getElementById(spot).prepend(br);
}



function previewImage(f){

	var file = f.files;
    
    
	
	if(!/\.(gif|jpg|jpeg|png)$/i.test(file[0].name)){
		alert('gif, jpg, png 파일만 선택해 주세요.\n\n현재 파일 : ' + file[0].name);

		
		f.outerHTML = f.outerHTML;

		document.getElementById('preview').innerHTML = '';

	}
	else {

		
		var reader = new FileReader();
        var cc;
		
		reader.onload = function(rst){
            
            document.getElementById('node'+ x).innerHTML += '<img src="' + rst.target.result + '"width = 160 height = 160 align = "right">';
            x = 0;
        }

		
		reader.readAsDataURL(file[0]);
        
        f.outerHTML = f.outerHTML;
		document.getElementById('preview').innerHTML = '';
        
	}
    
}






