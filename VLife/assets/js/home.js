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
menuItem.forEach(item=>{
    item.addEventListener('click', ()=>{ 
        removeActive();
        item.classList.add('active');
        document.querySelector('.notification-box').style.display='none'
    })
})
// 
document.querySelector('#notifications').addEventListener('click', ()=>{
    document.querySelector('.notification-box').style.display='block';
    document.querySelector('#ntCounter1').style.display='none';
})

document.querySelector('#messages-notifications').addEventListener('click', () => {
    document.querySelector('#ntCounter2').style.display = 'none';
})
//
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
    // Start Add post Popup.
document.querySelector('#create-lg').addEventListener('click',()=>{
    document.querySelector('.add-post-popup').style.display='flex'
});

document.querySelector('#feed-pic-upload').addEventListener('change',()=>{
    document.querySelector('#postImg').src = URL.createObjectURL(document.querySelector('#feed-pic-upload').files[0]);
})
// Start Add story
document.querySelector('#add-story').addEventListener('change',()=>{
    document.querySelector('.story img').src = URL.createObjectURL(document.querySelector('#add-story').files[0]);
    document.querySelector('.add-story').style.display='none'
});
// mini-button input
document.querySelector('.mini-button').addEventListener('click',()=>{
    document.querySelector('.input-post').classList.add('boxshadow1')
})

document.querySelector('.mini-button').addEventListener('dblclick',()=>{
    document.querySelector('.add-post-popup').style.display='flex'
})

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