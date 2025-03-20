import { bust } from './api.js';


export const shop_outline = (id_st) => {
    if (id_st == 'VC') {
        var tip = 'gpu'
        bust('http://localhost:3030/api/user/AllVideoCard', tip)
    }
    if (id_st == 'PR') {
        var tip = 'cpu'
        bust('http://localhost:3030/api/user/AllProccesor', tip)
    }
    if (id_st == "MS") {
        var tip = 'mouse'
        bust('http://localhost:3030/api/user/AllMouse', tip)
    }
}


export const nav_menu = (id_st) => {
    if (id_st == 'option') {
        $('.option').css('filter','invert(0.8)')
        $('.account').css('filter','invert(1)')

        $(`.wr_main_win`).css('display','none')
        $(`.game-center`).css('display','none')
        $(`.account-center`).css('display','none')

        $(`.game-center`).css('display','block')  
        
        
    }
    if (id_st == 'coin-main') {
        $('.account').css('filter','invert(1)')
        $('.option').css('filter','invert(1)')


        $(`.wr_main_win`).css('display','none')
        $(`.game-center`).css('display','none')
        $(`.account-center`).css('display','none')

        $(`.wr_main_win`).css('display','block')
    }
    if (id_st == "account") {
        
        $('.account').css('filter','invert(0.8)')
        $('.option').css('filter','invert(1)')

        $(`.wr_main_win`).css('display','none')
        $(`.game-center`).css('display','none')
        $(`.account-center`).css('display','none')

        $(`.account-center`).css('display','block')
    }
}
