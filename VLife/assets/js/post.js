function mypost() {
    // Tạo một phần tử <div> với lớp "status-main"
    var divStatusMain = document.createElement("div");
    divStatusMain.className = "status-main";
    // ==== Parent DIV (mainpost) ====
    var div = document.createElement("div");
    div.className = "album box";
    div.appendChild(divStatusMain);
    

    // ==== Adding div at the top ====
    var parent = document.getElementsByClassName("allpost");
    parent[0].insertBefore(div, parent[0].childNodes[0]);
  
    // ==== DIV userimg ====
    var img = document.createElement("img");
    img.className = "status-img"; // Sử dụng class "status-img" cho ảnh
    img.src = "https://scontent.fhan14-1.fna.fbcdn.net/v/t39.30808-1/351504112_3366589240337211_4890079189011262339_n.jpg?stp=dst-jpg_p100x100&_nc_cat=105&ccb=1-7&_nc_sid=fe8171&_nc_ohc=gc8dsVOtJWwAX8b4SK5&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.fhan14-1.fna&oh=00_AfCYnI7QHQT0WfINocPMiyXComl1gVCFvM9iFe0hp5NZQw&oe=652B24C6";
    divStatusMain.appendChild(img);
    
    // ==== DIV username ====
    var div2 = document.createElement("div");
    div2.className = "album-detail";
    var para = document.createElement("div");
    para.className = "album-title";
    var strong = document.createElement("strong");
    var text1 = document.createTextNode("Viet Nguyen");
    strong.appendChild(text1);
    para.appendChild(strong);
    div2.appendChild(para);
    divStatusMain.appendChild(div2);
    

    // ==== Paragraph time ====
    var para1 = document.createElement("div");
    para1.className = "album-date";
    var text2 = document.createTextNode("Just now");
    para1.appendChild(text2);
    para.appendChild(para1);
  
    // ==== Paragraph quotes (from textarea) ====
    var para2 = document.createElement("div");
    para2.className = "album-content";
    var textarea = document.querySelector(".status-textarea");
    var paapa = textarea.value;
    textarea.value = "";
  
    var text3 = document.createTextNode(paapa);
    para2.appendChild(text3);
    div.appendChild(para2);
      
    /*============ DIV actions ===============*/
    var div3 = document.createElement("div");
    div3.className = "album-actions";
    var a1 = document.createElement("a");
    a1.className = "album-action";
    var i1 = document.createElement("i");
    i1.className = "fa fa-heart-o";
    var text1 = document.createTextNode("0");
    a1.appendChild(i1);
    a1.appendChild(text1);
    div3.appendChild(a1);

    var a2 = document.createElement("a");
    a2.className = "album-action";
    var i2 = document.createElement("i");
    i2.className = "fa fa-comment-o";
    var text2 = document.createTextNode("0");
    a2.appendChild(i2);
    a2.appendChild(text2);
    div3.appendChild(a2);

    var a3 = document.createElement("a");
    a3.className = "album-action";
    var i3 = document.createElement("i");
    i3.className = "fa fa-share";
    var text3 = document.createTextNode("0");
    a3.appendChild(i3);
    a3.appendChild(text3);
    div3.appendChild(a3);
    div.appendChild(div3);

    
    // ==== Appending the new post ====
    incre++;
  }
  