let swiper = new Swiper(".mySwiper",{
    slidesPerView:6,
    spaceBetween: 5,
})


window.addEventListener('scroll', ()=>{
    document.querySelector('.profile-popup').style.display='none'
    document.querySelector('.add-post-popup').style.display='none'
})
//start  aside
let menuItem = document.querySelectorAll('.menu-item');

menuItem.forEach(item=>{ 
    item.addEventListener('click', ()=>{ 
        removeActive();
        item.classList.add('active');
    })
})
//active class remove
const removeActive = ()=>{
    menuItem.forEach(item=>{
        item.classList.remove('active')
    })
}

document.querySelector('#notifications').addEventListener('click', ()=>{
    if(document.querySelector('.notification-box').style.display === 'block'){
        removeActive()
        document.querySelector('.notification-box').style.display='none';
    }
    else{
        document.querySelector('.notification-box').style.display='block';
    }
})

// menuItem.forEach(item=>{
//     item.addEventListener('click', ()=>{ 
//         removeActive();
//         item.classList.add('active');
//         document.querySelector('.notification-box').style.display='none'
//     })
// })

let Accept = document.querySelectorAll('#Accept');
let Dlete = document.querySelectorAll('#Delete');

Accept.forEach(accept=>{
    accept.addEventListener('click', ()=>{
        accept.parentElement.style.display='none'
        accept.parentElement.parentElement.querySelector('.alert').style.display='block'
    })
});
Dlete.forEach(deletee=>{
    deletee.addEventListener('click', ()=>{
        deletee.parentElement.parentElement.style.display='none'
    })
});
    // ...Start Profile Popup...
document.querySelectorAll('#my-profile-picture').forEach (AllProfile => {
    AllProfile.addEventListener('click', ()=>{
        document.querySelector('.profile-popup').style.display='flex'
        
    })
});
document.querySelectorAll('.close').forEach (AllCloser=>{
    AllCloser.addEventListener('click', () => { 
        document.querySelector('.profile-popup').style.display='none'
        document.querySelector('.add-post-popup').style.display='none'
    })
});
document.querySelector('#profile-upload').addEventListener('change', ()=>{
    document.querySelectorAll('#my-profile-picture img').forEach (AllMyProfileImg=>{
        AllMyProfileImg.src = URL.createObjectURL(document.querySelector('#profile-upload').files[0])
    })
});


document.querySelector('#feed-pic-upload').addEventListener('change',()=>{
    document.querySelector('#postImg').src = URL.createObjectURL(document.querySelector('#feed-pic-upload').files[0]);
})
// Start Add story
document.querySelector('#add-story').addEventListener('change',()=>{
    document.querySelector('.story img').src = URL.createObjectURL(document.querySelector('#add-story').files[0]);
    document.querySelector('.add-story').style.display='none'
});




// liked button
document.querySelectorAll('.action-button span:first-child i').forEach(liked=>{
    liked.addEventListener('click',()=>{
        liked.classList.toggle('liked');
    });
});

// setTimeout
setTimeout(()=>{
    document.querySelector('.input-post').classList.remove('boxshadow1')
}, 300);

const myBtn = document.querySelector('#my_btn');
    const accountAction = document.querySelector('.account-action');

    myBtn.addEventListener('click', () => {
    if (accountAction.style.display === 'block') {
        accountAction.style.display = 'none'; // Nếu đang hiển thị, thì ẩn nó
    } else {
        accountAction.style.display = 'block'; // Nếu không hiển thị, thì hiển thị nó
    }
    });