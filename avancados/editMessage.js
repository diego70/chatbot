const env = require('../.env')
const Telegraf = require('telegraf')
const Extra = require('telegraf/extra')
const Markup = require('telegraf/markup')
const bot = new Telegraf(env.token)

let level = 3

const getLevel = () => {
    let label = ''
    for (let i = 1; i <= 5; i++){
        label += (level === i) ? '||' : '='
    }
    return label
}

const botoes = () => Extra.markup(Markup.inlineKeyboard([
    Markup.callbackButton('<<', '<'),
    Markup.callbackButton(getLevel(), 'result'),
    Markup.callbackButton('>>', '>'),
], { columns: 3}))

bot.start(ctx => {
    const name = ctx.update.message.from.first_name
    ctx.reply(`seja bem vindo, ${name}!`)
    ctx.reply(`Nível: ${level}`, botoes())
})

bot.action('<', ctx => {
    if(level === 1) {
        ctx.answerCbQuery('Chegou no Limite')
    } else {
        level -= 1
        ctx.editMessageText(`Nível: ${level}`, botoes())
    }
})

bot.action('>', ctx => {
    if(level === 5) {
        ctx.answerCbQuery('Chegou no Limite')
    } else {
        level += 1
        ctx.editMessageText(`Nível: ${level}`, botoes())
    }
})

bot.action('result', ctx => {
    ctx.answerCbQuery(`O nível atual está em: ${level}`)
})

bot.startPolling()