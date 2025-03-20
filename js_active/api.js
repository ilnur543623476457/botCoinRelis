const tg = window.Telegram.WebApp;
const user_id = tg.initDataUnsafe.user.id
const user_name = tg.initDataUnsafe.user.username
const photo_user = tg.initDataUnsafe.user.photo_url
var userIdBD = ''


// Стартовая функция, вывод инфы юзера от сервера 
export const UserStarting = () => {
    // console.log(user_id, user_name);
    const data = {
        id_user: user_id,
        userName: user_name
    }
    fetch('http://103.88.242.241:3030/api/user/registrationChek', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(res => res.json())
        .then(data => {
            // console.log(data);
            if (data.banAkk == '0') {
                $(".number").text(parseFloat(data.coin).toFixed(10));
                $(".numCoin").text(parseFloat(data.coin).toFixed(10));
                $(".userName").text(data.userName);
    
                $(".sp1").text(parseFloat(data.mouse).toFixed(10));
                $(".sp2").text(parseFloat(data.cpu).toFixed(10));
                $(".ref_coin_cod_txt2").text(data.meRefCode);
    
                if (data.ToRefCode != null) {
                    document.getElementById('ref_coin_cod_inp').value = data.ToRefCode;
                    $("#ref_btn").css('display', 'none');
                }
    
                if (data.userName == 'KostroCoin') {
                    $(".admin_img").css('display', 'block');
                }
                RefUser(data.meRefCode)
                // $(".user_top_20").empty()
    
                UserTop()    

                
                document.querySelector('.info_bl_ac').innerHTML = `<img class="img-ak" src="${photo_user}">`
                userIdBD = data.id
            } else {
                banOnOff()
            }



        })

}

const banOnOff = () => {
    $('.ban_akk').css('display', 'block')
    const anim = lottie
    anim.loadAnimation({
        container: document.getElementById('anim_ban'),
        render: 'svg',
        loop: true,
        autoplay: true,
        path: './anim/Anban.json'
    })
}







// Топ юзеров
export const UserTop = () => {
    fetch('http://103.88.242.241:3030/api/user/AllTop', {
        method: 'GET',
        headers: {
            'Content-type': 'application/json'
        },
    }).then(res => res.json())
        .then(data => {
            var it = 0
            var topCoin = []
            for (let i = 0; i < data.length; i++) {
                const element1 = data[i];
                topCoin.push(element1)
            }
            var dataSort = topCoin.sort((a, b) => parseFloat(a.coin).toFixed(10) > parseFloat(b.coin).toFixed(10) ? -1 : 1);
            $("#user_top_20").empty()
 
            for (let i = 0; i < dataSort.length; i++) {
                const element = dataSort[i];
                it += 1
                // https://t.me/Anchous_08
                var top = "";
                top +=
                    '<div class="UsR">' +
                    '<div class="number_usR">' + it + '</div>' +
                    '<div class="UsR-nick">' + element.userName + '</div>' +
                    '<div class="UsR-coin"></div>' +
                    '<div class="UsR-sum-soin">' + parseFloat(element.coin).toFixed(10) + '</div>' +
                    '<div id="http://t.me/'+ element.userName +'" class="obobl_card"></div>' +
                    '</div>';

                $(`#user_top_20`).append(top);
            }
        })
}

// тапалка коин
export const NewCoin = (CN, CN1) => {
    const data = {
        id_user: user_id,
    }
    fetch('http://103.88.242.241:3030/api/user/newCoinClick', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(res => res.json())
        .then(data => {
            UserStarting()
        })
};



// Покупка буста видеокарты
export const bust = (url, tip) => {
    $("#sell_item").empty()
    const data = {
        id_user: userIdBD
    }
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(res => res.json())
        .then(data => {
            for (let i = 0; i < data.length; i++) {
                const element = data[i];
                document.querySelector('#sell_item').innerHTML +=
                    '<div id="' + `gpu-${element.name.split(' ')[1]}-${parseFloat(element.bust).toFixed(10)}-${parseFloat(element.price).toFixed(10)}` + '" class="sell_item_block">' +
                    '<div class="sell_item_block_name">' + element.name + '</div>' +
                    '<div class="sell_item_block_name-t1 ' + `${element.name.split(' ')[1]}` + '">' + element.sum + '</div>' +
                    '<div class="txt1">Буст ' + parseFloat(element.bust).toFixed(10) + '</div>' +
                    '<div class="txt2">Цена ' + parseFloat(element.price).toFixed(10) + '</div>' +
                    '<div id="' + `${tip}-${element.name}-${element.name.split(' ')[1]}-${parseFloat(element.bust).toFixed(10)}-${parseFloat(element.price).toFixed(10)}` + '" class="price_sell">+</div>' +
                    '</div>';
            }
        })
};





export const RefCode = (valRefCode) => {
    const data = {
        id_user: user_id,
        valRefCode: valRefCode
    }
    fetch('http://103.88.242.241:3030/api/user/RefCodeUser', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(res => res.json())
        .then(data => {
            if (data == 'no'){
                console.log('vfdsbv');
                document.querySelector('.no_block1').classList.add('no_block_on')
                setTimeout(() => {
                    document.querySelector('.no_block1').classList.remove('no_block_on')
                }, 2000);
            }
        })
};


// Все рефералы
export const RefUser = (valRefCode) => {
    const data = {
        valRefCode: valRefCode
    }
    fetch('http://103.88.242.241:3030/api/user/RefUser', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(res => res.json())
        .then(data => {
            $("#ref_user_col").text(data.UserRef);
            $("#ref_user_coin").text(data.itogRefCoin);
        })
}




// создание бустов

const plach = document.querySelector('.new_plach')
const formEm = document.querySelector('#form_id')
formEm.addEventListener('submit', event => {
    event.preventDefault()
    if (formEm.classList[0] == 'VC') {
        const formData = new FormData(formEm)
        const data = Object.fromEntries(formData)
        fetch('http://103.88.242.241:3030/api/user/NewVideoCard', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(res => res.json())
            .then(data => {
                plach.classList.remove('block')
                formEm.classList.remove(formEm.classList[0])
            })

    }
    if (formEm.classList[0] == 'RP') {
        const formData = new FormData(formEm)
        const data = Object.fromEntries(formData)
        fetch('http://103.88.242.241:3030/api/user/NewProccesor', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(res => res.json())
            .then(data => {
                plach.classList.remove('block')
                formEm.classList.remove(formEm.classList[0])
            })
    }
    if (formEm.classList[0] == 'MS') {
        const formData = new FormData(formEm)
        const data = Object.fromEntries(formData)
        fetch('http://103.88.242.241:3030/api/user/NewMouse', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(res => res.json())
            .then(data => {
                plach.classList.remove('block')
                formEm.classList.remove(formEm.classList[0])
            })
    }
})




// покупка бустов


export const purchaseBust = (url, name_card, IdBust, price) => {
    const sign = Math.sign($('.number').text() - price)

    if (sign == -1) {
        document.querySelector('.no_block').classList.add('no_block_on')
        setTimeout(() => {
            document.querySelector('.no_block').classList.remove('no_block_on')
        }, 1000);
    }
    if (sign == 1 || sign == 0) {
        const data = {
            id_user: user_id,
            name_card: name_card,
        }
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(res => res.json())
            .then(data => {
                UserStarting()
                const button = document.getElementById(IdBust);
                button.click();
            })
    }
};





export const TimeFarmCoin = (secOver) => {
    const data = {
      id_user: user_id,
      timeSleep: secOver
    }
    fetch('http://103.88.242.241:3030/api/user/NewCoinClickFarmAFK', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(res => res.json())
      .then(data => {
        $(".number").text(parseFloat(data).toFixed(10));
        $(".numCoin").text(parseFloat(data).toFixed(10));
      })
}


export const setTimeOnlineFarmCoin = () => {
    setInterval(() => {
        const data = {
            id_user: user_id,
        }
        fetch('http://103.88.242.241:3030/api/user/NewCoinClickFarm', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(res => res.json())
            .then(data => {
                document.querySelector('.number').innerHTML = data
                document.querySelector('.numCoin').innerHTML = data
            })
    }, 1000);
}

// создание заявки на продажу
export const CreateSell = (sum, curs) => {
    const data = {
        userIdMe: user_id,
        userNameMe: user_name,
        sum: sum,
        curs: curs,
    }
    fetch('http://103.88.242.241:3030/api/user/SellUser', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(res => res.json())
        .then(data => {
            // console.log(data);
            AllSell()
        })
}

export const AllSell = () => {
    $(".sel").empty()

    fetch('http://103.88.242.241:3030/api/user/AllSellUser', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
    }).then(res => res.json())
        .then(data => {
            for (let i = 0; i < data.length; i++) {
                const element = data[i];
                // console.log(element);

                document.querySelector('.sel').innerHTML +=
                    '<div class="sel_card">' +
                    '<div class="user_ml"></div>' +
                    '<div class="user_n">'+ element.userNameMe +'</div>' +
                    '<div class="prise">' +
                    '<div class="prise_txt">'+ element.sum +'</div>' +
                    '<div class="pr_coin"></div>' +
                    '</div>' +
                    '<div class="curs">'+ element.curs +' руб/coin</div>' +
                    '<div id="http://t.me/'+ element.userNameMe +'" class="obobl_card_sel"></div>' +
                    '</div>';
            }
        })
}



// перевод монет
export const CreateWithdraw = (user_name_two, sum) => {
    const data = {
        nameUs1: user_name,
        nameUs2: user_name_two,
        sum: sum,
    }
    fetch('http://103.88.242.241:3030/api/user/WithdrawCoinUser', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(res => res.json())
        .then(data => {
            // console.log(data);
            AllCreateWithdraw()
        })
}


export const AllCreateWithdraw = () => {
    

    fetch('http://103.88.242.241:3030/api/user/AllWithdrawCoinUser', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
    }).then(res => res.json())
        .then(data => {
            $(".per_history").empty()
            for (let i = 0; i < data.length; i++) {
                const element = data[i];
                if (element.nameUs1 == user_name|| element.nameUs2 == user_name) {
                    // console.log(element);
                    if (element){
                        if (element.nameUs1 == user_name) {
                            document.querySelector('.per_history').innerHTML +=
                                '<div class="user_his_opt">' +
                                '<div class="user_his_opt_img"></div>' +
                                '<div class="user_his_opt_usname">'+ element.nameUs2 +'</div>' +
                                '<div class="user_his_opt_coin">' +
                                '<div class="user_his_opt_coin_txt" style="color: #ff9797">- '+ element.sum +'</div>' +
                                '<div class="pr_coin"></div>' +
                                '</div>' +
                                '</div>';
                            UserStarting()
        
                        } else {
                            document.querySelector('.per_history').innerHTML +=
                                '<div class="user_his_opt">' +
                                '<div class="user_his_opt_img"></div>' +
                                '<div class="user_his_opt_usname">'+ element.nameUs2 +'</div>' +
                                '<div class="user_his_opt_coin">' +
                                '<div class="user_his_opt_coin_txt" style="color: #82ff82">+ '+ element.sum +'</div>' +
                                '<div class="pr_coin"></div>' +
                                '</div>' +
                                '</div>';
                                UserStarting()
                        }

                    }
                    
                }


            }
        })
}

// поиск юзера
export const UserSearch = (userName) => {
    const data = {
        user_name: userName,
    }
    fetch('http://103.88.242.241:3030/api/user/AllUser', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(res => res.json())
        .then(data => {
            // console.log(data);
            if (data) {
                $('.otpravka_coin_page').css("display", "block");
                const coin = $('.number').text()
                document.querySelector('.otpravka_coin_page_inp').value = coin
            } else {
                $('.no_block2').css("display", "block");
                setTimeout(() => {
                    $('.no_block2').css("display", "none");
                }, 2000);

            }
        })
}



// Новый игрок
export const NewGamer = (a) => {
    const data = {
        id_user: user_id,
        user_name: user_name,
        coinStavca: a,
    }
    fetch('http://103.88.242.241:3030/api/user/NewGamerLat', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(res => res.json())
        .then(data => {
            UserStarting()
            // console.log(data);
        })
}


// Новый игрок
export const AllNewGamer = () => {
    fetch('http://103.88.242.241:3030/api/user/AllGamersLat', {
        method: 'GET',
        headers: {
            'Content-type': 'application/json'
        },
    }).then(res => res.json())
        .then(data => {
            // $(".pl_gm_game_block_user").empty()
            document.querySelector('.pl_gm_game_block_user').innerHTML +=
                '<div class="user_gamer">' +
                '<div class="photo_user_gamer"></div>' +
                '<div class="name_user_gamer">' + data.name + '</div>' +
                '<div class="coin_user_gamer">Поставил ' + data.coin + ' coin</div>' +
                '</div>';
            AllNewGamer()
            ChekGamers()
        })
}

const ChekGamers = () => {
    const sum_coin = []
    let parent = document.querySelector('.pl_gm_game_block_user');
    let chiled = parent.querySelectorAll('.coin_user_gamer');
    for (let i = 0; i < chiled.length; i++) {
        const element = chiled[i];
        sum_coin.push($(element).text().split(' ')[1])
    }
    // console.log(sum_coin.length);
    const sumOfNumbers = sum_coin.reduce((acc, number) => acc + parseFloat(number), 0);
    // console.log(sumOfNumbers);

    document.querySelector('.user_game').innerHTML = sum_coin.length
    document.querySelector('.stavka_sum').innerHTML = sumOfNumbers.toFixed(10)
}



// все игроки
export const WithAllUserGamer = () => {
    fetch('http://103.88.242.241:3030/api/user/WithAllGamerVse', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
    }).then(res => res.json())
        .then(data => {
            $(".pl_gm_game_block_user").empty()
            for (let i = 0; i < data.length; i++) {
                const element = data[i];
                if (element.on_of == 0) {
                    // console.log(element);
                    document.querySelector('.pl_gm_game_block_user').innerHTML +=
                        '<div class="user_gamer">' +
                        '<div class="photo_user_gamer"></div>' +
                        '<div class="name_user_gamer">' + element.name + '</div>' +
                        '<div class="coin_user_gamer">Поставил ' + element.coin + ' coin</div>' +
                        '</div>';
                }
            }
            ChekGamers()
        })
}



// скртыть игроков после завершения таймера
export const OverTimeGamer = () => {
    fetch('http://103.88.242.241:3030/api/user/WithAllGamerVseOff', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
    }).then(res => res.json())
        .then(data => {})
}


// вывод победиля
export const TopGamerUser = (name_vinner, coinsum) => {
    if (name_vinner == user_name) {
        $('.block_win_game').css('display', 'block')
        const anim = lottie
        anim.loadAnimation({
            container: document.querySelector('.block_win_game'),
            render: 'svg',
            loop: false,
            autoplay: true,
            path: './anim/AnWinner.json'
        })
        setTimeout(() => {
            $('.block_win_game').empty()
            $('.block_win_game').css('display', 'none')
        }, 2000);
        setTimeout(() => {
            UserStarting()
            AllWinLat()
        }, 1750);
    } else {
        // console.log('проигравший');
        $('.block_over_game').css('display', 'block')
        const anim = lottie
        anim.loadAnimation({
            container: document.querySelector('.animTwo'),
            render: 'svg',
            loop: false,
            autoplay: true,
            path: './anim/AnOver.json'
        })
        setTimeout(() => {
            $('.block_over_game').empty()
            $('.block_over_game').css('display', 'none')
        }, 2000);
        setTimeout(() => {
            UserStarting()
            AllWinLat()
        }, 1750);
    }
    const data = {
        name_user: name_vinner,
        coinsum: coinsum
    }
    fetch('http://103.88.242.241:3030/api/user/TopGamer', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(res => res.json())
        .then(data => {
            $(".pl_gm_game_block_user").empty()
            document.querySelector('.user_game').innerHTML = 0
            document.querySelector('.stavka_sum').innerHTML = 0
        })
}




// Победители в латереи
export const AllWinLat = () => {
    fetch('http://103.88.242.241:3030/api/user/AllRTopLat', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
    }).then(res => res.json())
        .then(data => {
            $(".pl_gm_top_block_top").empty()
            for (let i = 0; i < data.length; i++) {
                const element = data[i];
                document.querySelector('.pl_gm_top_block_top').innerHTML +=
                    '<div class="pl_gm_top_block_top_user">' +
                    '<div class="pl_gm_top_block_top_user_img"></div>' +
                    '<div class="pl_gm_top_block_top_user_name">'+ element.name +'</div>' +
                    '<div class="pl_gm_top_block_top_user_coin">Выиграл '+ element.coin +'</div>' +
                    '</div>';
            }
        })
}



// выдат монеты
export const dobCoin = (name_user, coin_sum) => {
    const data = {
        name_user: name_user,
        coinsum: coin_sum
    }
    // console.log(data);
    fetch('http://103.88.242.241:3030/api/user/DobCoin', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(res => res.json())
        .then(data => {
            // console.log(data);
        })
}


// Забрать монеты
export const delCoin = (name_user, coin_sum) => {
    const data = {
        name_user: name_user,
        coinsum: coin_sum
    }
    // console.log(data);
    fetch('http://103.88.242.241:3030/api/user/DelCoin', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(res => res.json())
        .then(data => {
            // console.log(data);
        })
}


// Забрать монеты
export const BanUnban = (name_user, ban) => {
    const data = {
        name_user: name_user,
        valueBan: ban
    }
    // console.log(data);
    fetch('http://103.88.242.241:3030/api/user/BanAkk', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(res => res.json())
        .then(data => {
            // console.log(data);
        })
}







// Новый игрок game 2
export const NewGamerTwo = (a, comand) => {
    const data = {
        id_user: user_id,
        user_name: user_name,
        coinStavca: a,
        comand: comand
    }
    // console.log(data);
    fetch('http://103.88.242.241:3030/api/user/NewGamerLatTwo', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(res => res.json())
        .then(data => {
            UserStarting()
        })
}


export const AllNewGamerTwo = () => {
    fetch('http://103.88.242.241:3030/api/user/AllGamersLatTwo', {
        method: 'GET',
        headers: {
            'Content-type': 'application/json'
        },
    }).then(res => res.json())
        .then(data => {
            // console.log(data);

            if (data.comand == 'bot') {
                document.querySelector('#bot_gamers').innerHTML +=
                    '<div class="gamers_block">' +
                    '<img src="./img/coin.jpg">' +
                    '<div class="gamers_block_txt_coin">'+ data.coin +'</div>' +
                    '</div>';
                AllNewGamerTwo()
                // ChekGamersTwo()
            }
            if (data.comand == 'user') {
                document.querySelector('#user_gamers').innerHTML +=
                    '<div class="gamers_block">' +
                    '<img src="/img/coin.jpg"">' +
                    '<div class="gamers_block_txt_coin">'+ data.coin +'</div>' +
                    '</div>';
                AllNewGamerTwo()
                // ChekGamersTwo()
            }
            ChekGamersTwo()
        })
}




// все игроки 2 игра
export const WithAllUserGamerTwo = () => {
    fetch('http://103.88.242.241:3030/api/user/WithAllGamerVseTwo', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
    }).then(res => res.json())
        .then(data => {
            var arrCoinsum = []
            var userArr = []
            var botArr = []
            for (let i = 0; i < data.length; i++) {
                const element = data[i];
                if (element.on_of == 0) {
                    // console.log(element);
                    if (element.comand == 'bot') {
                        document.querySelector('#bot_gamers').innerHTML +=
                            '<div class="gamers_block">' +
                            '<img src="./img/coin.jpg">' +
                            '<div class="gamers_block_txt_coin">'+ element.coin +'</div>' +
                            '</div>';
                        botArr.push(element.coin)
                    }
                    if (element.comand == 'user') {
                        document.querySelector('#user_gamers').innerHTML +=
                            '<div class="gamers_block">' +
                            '<img src="/img/coin.jpg"">' +
                            '<div class="gamers_block_txt_coin">'+ element.coin +'</div>' +
                            '</div>';
                        userArr.push(element.coin)
                        
                    }

                    arrCoinsum.push(element.coin)
                }
            }

            // общее
            const sumOfNumbers = arrCoinsum.reduce((acc, number) => acc + parseFloat(number), 0);
            const user_gamer_two = arrCoinsum.length
            // console.log(sumOfNumbers, user_gamer_two)
            $('#stavka_sum_two').text(sumOfNumbers)
            $('#user_game_two').text(user_gamer_two)

            // баланс user
            const sumOfNumbers1 = userArr.reduce((acc, number) => acc + parseFloat(number), 0);
            // console.log(sumOfNumbers1)
            $('#stavka_sum_two_user').text(sumOfNumbers1)

            // баланс bot
            const sumOfNumbers2 = botArr.reduce((acc, number) => acc + parseFloat(number), 0);
            // console.log(sumOfNumbers2)
            $('#stavka_sum_two_bot').text(sumOfNumbers2)
            
        })
}






// все игроки 2 игра
export const ChekGamersTwo = () => {
    fetch('http://103.88.242.241:3030/api/user/WithAllGamerVseTwo', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
    }).then(res => res.json())
        .then(data => {
            var arrCoinsum = []
            var userArr = []
            var botArr = []
            for (let i = 0; i < data.length; i++) {
                const element = data[i];
                if (element.on_of == 0) {
                    // console.log(element);
                    if (element.comand == 'bot') {
                        botArr.push(element.coin)
                    }
                    if (element.comand == 'user') {
                        userArr.push(element.coin)
                    }
                    arrCoinsum.push(element.coin)
                }
            }

            // общее
            const sumOfNumbers = arrCoinsum.reduce((acc, number) => acc + parseFloat(number), 0);
            const user_gamer_two = arrCoinsum.length
            // console.log(sumOfNumbers, user_gamer_two)
            $('#stavka_sum_two').text(sumOfNumbers)
            $('#user_game_two').text(user_gamer_two)

            // баланс user
            const sumOfNumbers1 = userArr.reduce((acc, number) => acc + parseFloat(number), 0);
            // console.log(sumOfNumbers1)
            $('#stavka_sum_two_user').text(sumOfNumbers1)

            // баланс bot
            const sumOfNumbers2 = botArr.reduce((acc, number) => acc + parseFloat(number), 0);
            // console.log(sumOfNumbers2)
            $('#stavka_sum_two_bot').text(sumOfNumbers2)

        })
}






// Новый игрок game 2
export const GameOverTwo = (win, form) => {
    const data = {
        win: win,
        formula: form
    }
    // console.log(data);
    fetch('http://103.88.242.241:3030/api/user/GetWinUser', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(res => res.json())
        .then(data => {
            // console.log(data);
            WinFilter(win)
        })
}


// все игроки 2 игра
export const WinFilter = (comand) => {
    fetch('http://103.88.242.241:3030/api/user/WithAllGamerVseTwo', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
    }).then(res => res.json())
        .then(data => {
            $('.gamers_block').remove()
            for (let i = 0; i < data.length; i++) {
                const element = data[i];
                if (element.on_of == 0) {
                    // console.log(element);
                    if (element.name == user_name) {
                        // console.log(comand);
                        if (element.comand == comand) {
                            $('.block_win_game_two').css('display', 'block')
                            const anim = lottie
                            anim.loadAnimation({
                                container: document.querySelector('.block_win_game_two'),
                                render: 'svg',
                                loop: false,
                                autoplay: true,
                                path: './anim/AnWinner.json'
                            })
                            setTimeout(() => {
                                $('.block_win_game_two').empty()
                                $('.block_win_game_two').css('display', 'none')
                            }, 2000);
                            setTimeout(() => {
                                // AllWinLat()
                            }, 1750);
                        } else {
                            $('.block_over_game_two').css('display', 'block')
                            const anim = lottie
                            anim.loadAnimation({
                                container: document.querySelector('.block_over_game_two'),
                                render: 'svg',
                                loop: false,
                                autoplay: true,
                                path: './anim/AnOver.json'
                            })
                            setTimeout(() => {
                                $('.block_over_game_two').empty()
                                $('.block_over_game_two').css('display', 'none')
                            }, 2000);
                            setTimeout(() => {
                                // AllWinLat()
                            }, 1750);
                        }
                    }
                }
            }
        })
        UserStarting()
        GetWinUserAllOff()
}



// игроки оф
export const GetWinUserAllOff = () => {
    fetch('http://103.88.242.241:3030/api/user/GetWinUserAllOff', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
    }).then(res => res.json())
        .then(data => {
            // UserStarting()
            // console.log(data);
            $('#stavka_sum_two').text('0')
            $('#user_game_two').text('0')
            $('#stavka_sum_two_user').text('0')
            $('#stavka_sum_two_bot').text('0')
            AllTopGamerTwoGame()
        })
}


// игроки оф
export const AllTopGamerTwoGame = () => {
    fetch('http://103.88.242.241:3030/api/user/AllTopGamerTwoGame', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
    }).then(res => res.json())
        .then(data => {
            $('#pl_gm_top_block_top_two').empty()
            for (let i = 0; i < data.length; i++) {
                const element = data[i];

                document.querySelector('#pl_gm_top_block_top_two').innerHTML +=
                    '<div class="top_b_block">' +
                    '<div class="top_b_block_txt">Выиграли '+ element.name+'</div>' +
                    '</div>';
            }

        })
}





















// timer
export const timeOne = () => {
    fetch('http://103.88.242.241:3030/api/user/WithAllGamerVse', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
    }).then(res => res.json())
        .then(data => {
            // console.log(data);
        })
}
