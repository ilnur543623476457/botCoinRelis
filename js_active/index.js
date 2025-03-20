import { AllTopGamerTwoGame, UserStarting, NewCoin, RefCode, purchaseBust, TimeFarmCoin, setTimeOnlineFarmCoin, CreateSell, AllSell, AllCreateWithdraw, UserSearch, CreateWithdraw, NewGamer, AllNewGamer, WithAllUserGamer, OverTimeGamer, TopGamerUser, AllWinLat, dobCoin, delCoin, BanUnban, NewGamerTwo, AllNewGamerTwo, WithAllUserGamerTwo, GameOverTwo } from './api.js';
import { shop_outline, nav_menu } from './anim.js';
var socket = new WebSocket('ws://localhost:3050');


const tg = window.Telegram.WebApp;
tg.expand();

// start fun
window.addEventListener('load', () => {    

    const user_id = tg.initDataUnsafe.user.id
    const user_name = tg.initDataUnsafe.user.username
    const photo_user = tg.initDataUnsafe.user.photo_url
    
    
    alert(
        user_id,
        user_name,
        photo_user
    )
    
    UserStarting()
    test()
    setTime()
    // UserTop()
    AllSell()
    AllCreateWithdraw()
    sub()
    timeBack()

    setTimeOnlineFarmCoin()

    WithAllUserGamer()
    AllWinLat()
    WithAllUserGamerTwo()

    timeBackTwo()
    AllTopGamerTwoGame()

    const button = document.querySelector('.game');
    button.click();




})



// tap coin
$(".coin_zar").on("click", () => {
    document.querySelector('.coin_zar').classList.add('ontapcoin')
    setTimeout(() => {
        document.querySelector('.coin_zar').classList.remove('ontapcoin')
    }, 100);
    NewCoin()
})

// магазин
$(".rt_img").on("click", (e) => {
    shop_outline(e.target.id)
    $(`#VC`).css('filter','invert(1)')
    $(`#PR`).css('filter','invert(1)')
    $(`#MS`).css('filter','invert(1)')
    $(`#${e.target.id}`).css('filter','invert(0.5)')
})

// refCode
$("#ref_btn").on("click", (e) => {
    var valRefCode = document.getElementById('ref_coin_cod_inp').value
    document.getElementById('ref_coin_cod_inp').value = valRefCode;
    RefCode(valRefCode)
})

// покупка бустов
$(".menu").on("click", (e) => {
    nav_menu(e.target.classList[0])
})


// кнопка перевести продать
$(".windraw").on("click", () => {
    $('.sel_buy').css("display", "block");
})

$(".close_sel_buy").on("click", () => {
    $('.sel_buy').css("display", "none");
})

// кнопка реферад
$(".referal").on("click", () => {
    $('.ref').css("display", "block");
})

$(".ref_close").on("click", () => {
    $('.ref').css("display", "none");
})

// перевод
$(".btn_windr").on("click", () => {
    $('.translate_sel').css("display", "block");
})

$(".trans").on("click", () => {
    $('.translate_sel').css("display", "none");
})


// продажа
$(".btn_lock").on("click", () => {
    $('.mod_sel').css("display", "block");
})

$(".mod").on("click", () => {
    $('.mod_sel').css("display", "none");
})



// закрытие админ панели
$(".admin_img").on("click", () => {
    $('.admin_center').css("display", "block");
})

$(".admin_center_close").on("click", () => {
    $('.admin_center').css("display", "none");
})



// создание нового буста
$('.dop').click(function () {
    const pl_txt = document.querySelector('.NP_txt')
    const formEm = document.querySelector('#form_id')
    var target = $(this).attr('id')
    if (target == 'VC') {
        var txt = 'Новая видеокарта'
        pl_txt.innerHTML = txt
        formEm.classList.add('VC')
        document.querySelector('.new_plach').classList.add('block')
    }
    if (target == 'RP') {
        var txt = 'Новый процессор'
        pl_txt.innerHTML = txt
        formEm.classList.add('RP')
        document.querySelector('.new_plach').classList.add('block')
    }
    if (target == 'MS') {
        var txt = 'Новая мышка'
        pl_txt.innerHTML = txt
        formEm.classList.add('MS')
        document.querySelector('.new_plach').classList.add('block')
    }
});

// закрытие создания нового буста
document.querySelector('.new_plach_close').addEventListener('click', () => {
    document.querySelector('.new_plach').classList.remove('block')
    document.querySelector('#form_id').classList.remove('VC')
    document.querySelector('#form_id').classList.remove('RP')
    document.querySelector('#form_id').classList.remove('MS')
})

// копирование реф кода
$(".ref_coin_cod_txt2").on("click", (e) => {
    var txt_ref = $('.ref_coin_cod_txt2').text()
    navigator.clipboard.writeText(txt_ref)
    $('.ref_coin_cod_txt2').css("color", "#00bf81");
    setTimeout(() => {
        $('.ref_coin_cod_txt2').css("color", "white");
    }, 2000);
})



// покупка бустов
const handleClick = (event) => {
    const id = event.target.id
    if (id) {
        const sel_name = id.split('-')[0]
        const name_card = id.split('-')[1]
        const name_bust = id.split('-')[2]
        const bust = id.split('-')[3]
        const price = id.split('-')[4]

        if (sel_name == 'gpu') {
            purchaseBust('http://localhost:3030/api/user/bustVC', name_card, 'VC', price)
        }

        if (sel_name == 'cpu') {
            purchaseBust('http://localhost:3030/api/user/bustPR', name_card, "PR", price)
        }

        if (sel_name == 'mouse') {
            purchaseBust('http://localhost:3030/api/user/bustMS', name_card, "MS", price)
        }
    }
}
document.querySelector("#sell_item").addEventListener("click", handleClick)



// фарминг монет офлайн
const setTime = () => {
    const now = new Date();
    var tim = now.toTimeString().split(' ')[0].split(':')
    const lastTime = localStorage.getItem('lastTime');

    let firstDate = lastTime
    let secondDate = `${tim[0]}:${tim[1]}`

    let getDate = (string) => new Date(0, 0, 0, string.split(':')[0], string.split(':')[1]); //получение даты из строки (подставляются часы и минуты
    let different = (getDate(secondDate) - getDate(firstDate));

    let hours = Math.floor((different % 86400000) / 3600000);
    let minutes = Math.round(((different % 86400000) % 3600000) / 60000);
    let secOver = ((hours * 60 * 60) + (minutes * 60))



    if (secOver <= 259200) {
        TimeFarmCoin(secOver)
    } else {
        var sec = secOver - (secOver - 259200)
        TimeFarmCoin(sec)
    }
}

window.onbeforeunload = function () {
    const now = new Date();
    var tim = now.toTimeString().split(' ')[0].split(':')
    localStorage.setItem('lastTime', `${tim[0]}:${tim[1]}`);
};




$(".btn_mod_sel").on("click", () => {
    const a = document.getElementById('in_bl_m-s-1').value;
    const b = document.getElementById('in_bl_m-s-2').value;
    // console.log(a, b);
    CreateSell(a, b)
    $('.mod_sel').css("display", "none");
})



$(".btn_tr_im_s").on("click", () => {
    const a = document.querySelector('.inp_trns_serch').value;
    const b = $('.userName').text()
    // console.log(a);
    if (a == b) {
        $('.no_block3').css('display','block')
        setTimeout(() => {
            $('.no_block3').css('display','none')
        }, 2000);
    } else {
        UserSearch(a)
        localStorage.setItem('UserWithdraw', a)
    }
})


$(".otpravka_coin_page_btn").on("click", () => {
    const coin = $('.number').text()
    const a = document.querySelector('.otpravka_coin_page_inp').value;
    if (a >= 0.000000001) {
        var userNameTwo = localStorage.getItem('UserWithdraw')
        var iCoin =  Math.sign(coin - a)
        if (iCoin == -1) {
            $('.no_block').css("display", "block");
            setTimeout(() => {
                $('.no_block').css("display", "none");
            }, 2000);
    
        }
        if (iCoin == 1 || iCoin == 0) {
            $('.otpravka_coin_page').css("display", "none");
            CreateWithdraw(userNameTwo, a)
        }
    } else {
        $('.otpravka_coin_page').css("display", "none");

        $('.no_block4').css("display", "block");
        setTimeout(() => {
            $('.no_block4').css("display", "none");
        }, 2000);
    }
})

// Одиночная латтерея

$(".pl_gm_game_block_btn").on("click", () => {
    const a = document.querySelector('.pl_gm_game_block_inp').value;
    const coin = $('.number').text()
    var iCoin =  Math.sign(coin - a)
    if (a >= 0.0000000001) {
        if (iCoin == 1 || iCoin == 0) {
            // console.log(a);
            NewGamer(a)
        } else {
            $('.no_block').css("display", "block");
            setTimeout(() => {
                $('.no_block').css("display", "none");
            }, 2000);
        }
    } else {
        console.log('no');
    }
})


const sub = () => {
    try {
        AllNewGamer()
        AllNewGamerTwo()
    } catch (error) {
        setTimeout(() => {
            AllNewGamer()
            AllNewGamerTwo()
        }, 1000);
    }
}




const timeBack = () => {
    setInterval(() => {
        var t = $('.time_over').text();
        if (t.split(' ')[0] == 0) {
            let parent = document.querySelector('.pl_gm_game_block_user');
            let chiled = parent.querySelectorAll('.name_user_gamer');
            const sum_coin = []
    
            for (let i = 0; i < chiled.length; i++) {
                const element = chiled[i];
                sum_coin.push($(element).text())
            }
            var rand = Math.floor(Math.random() * sum_coin.length);
            var name_vinner = sum_coin[rand]
            var coinsum = $('.stavka_sum').text();

            if (coinsum != 0) {
                TopGamerUser(name_vinner, coinsum)
                // console.log(name_vinner, coinsum);
            }
            // OverTimeGamer()
        }
    }, 1000);
}



const test = () => {
    socket.onopen = function () {
        console.log("Соединение установлено.");
        SendMes()
    }
}

const SendMes = () => {
    setInterval(() => {
        const message = {
            event: 'mes'
        }
        socket.send(JSON.stringify(message))

        socket.onmessage = function(event) {
            const mesTime = JSON.parse(event.data)
            document.querySelector('.time_over').innerHTML = `${mesTime.time} сек`
            document.querySelector('#time_over_two').innerHTML = `${mesTime.time} сек`
          };
    }, 1000);
}




$('#oneG').on('click', () => {
    $('#pl_gm').css('display', 'block')
})

$('.pl_gm_off').on('click', () => {
    $('#pl_gm').css('display', 'none')
})


$('.game').on('click', () => {
    $('.top').css('border-bottom', 'none')
    $('.game').css('border-bottom', '1px solid white')
    $('.pl_gm_top_block_top_top').css('display', 'none')

    $('.pl_gm_top_block_top').css('display', 'none')
    $('.pl_gm_game_block').css('display', 'block')
})


$('.top').on('click', () => {
    $('.game').css('border-bottom', 'none')
    $('.top').css('border-bottom', '1px solid white')

    $('.pl_gm_game_block').css('display', 'none')
    $('.pl_gm_top_block_top').css('display', 'block')
    $('.pl_gm_top_block_top_top').css('display', 'block')
})



$('#Dob_coin').on('click', () => {
    var name_user = document.getElementById('block_key_block_inp1').value
    var coin_sum = document.getElementById('block_key_block_inp2').value
    // console.log(name_user, coin_sum);
    dobCoin(name_user, coin_sum)

})

$('#Del_coin').on('click', () => {
    var name_user = document.getElementById('block_key_block_inp1').value
    var coin_sum = document.getElementById('block_key_block_inp2').value
    // console.log(name_user, coin_sum);
    delCoin(name_user, coin_sum)

})



$('#Ban').on('click', () => {
    var name_user = document.getElementById('bun_inp').value
    var ban = 1
    // console.log(name_user, ban);
    BanUnban(name_user, ban)
})

$('#Unban').on('click', () => {
    var name_user = document.getElementById('bun_inp').value
    var ban = 0
    // console.log(name_user, ban);
    BanUnban(name_user, ban)

})



const UsrClick = (event) => {
    const id = event.target.id
    // console.log(id);
    if (id) {
        window.open(id);
    }
}
document.querySelector("#user_top_20").addEventListener("click", UsrClick)


const UsrClickSel = (event) => {
    const id = event.target.id
    // console.log(id);
    if (id) {
        window.open(id);
    }
}
document.querySelector(".sel").addEventListener("click", UsrClickSel)





$('#twoG').on('click', () => {
    $('#pl_gm_two').css('display', 'block')
})

$('.pl_gm_off_two').on('click', () => {
    $('#pl_gm_two').css('display', 'none')
})



$('#C_User').on('click', (e) => {
    const a = document.querySelector('#pl_gm_game_block_inp2').value;
    const coin = $('.number').text()
    var iCoin =  Math.sign(coin - a)
    if (a >= 0.0000000001) {
        if (iCoin == 1 || iCoin == 0) {
            var com = 'user'
            // console.log(a, com);
            NewGamerTwo(a, com)
        } else {
            $('.no_block').css("display", "block");
            setTimeout(() => {
                $('.no_block').css("display", "none");
            }, 2000);
        }
    } else {
        console.log('no');
    }
})


$('#C_Bot').on('click', () => {
    const a = document.querySelector('#pl_gm_game_block_inp2').value;
    const coin = $('.number').text()
    var iCoin =  Math.sign(coin - a)
    if (a >= 10) {
        if (iCoin == 1 || iCoin == 0) {
            var com = 'bot'
            // console.log(a, com);
            NewGamerTwo(a, com)
        } else {
            $('.no_block').css("display", "block");
            setTimeout(() => {
                $('.no_block').css("display", "none");
            }, 2000);
        }
    } else {
        console.log('no');
    }
})





const timeBackTwo = () => {
    const sT = setInterval(() => {
        var t = $('.time_over_two').text();
        if (t.split(' ')[0] == 0) {
            var obhStavca = $('.stavka_sum_two').text()
            if (obhStavca != 0) {
                var f = ['bot', 'user']
                var randomIndex = Math.floor(Math.random() * f.length);
                // console.log(f[randomIndex]);
                var win = f[randomIndex]
                
                const coinUser = $('#stavka_sum_two_user').text()
                const coinBot = $('#stavka_sum_two_bot').text()
    
                if (win == 'bot') {
                    var form = (parseFloat(coinBot) / parseFloat(coinUser)).toFixed(1)
                    if (form != Infinity) {
                        if (form != 0.0) {
                            GameOverTwo(win, form)
                        }
                    }
                }
                if (win == 'user') {
                    var form = (parseFloat(coinUser) / parseFloat(coinBot)).toFixed(1)
                    if (form != Infinity) {
                        if (form != 0.0) {
                            GameOverTwo(win, form)
                        }
                    }
                }
            }
        }
    }, 1000);
}
