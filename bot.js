const Discord = require('discord.js');

const client = new Discord.Client();

client.on('ready', () => {
    console.log(`Logged in as ${Font Bot}`);
});

client.on('message', (message) => {
    if (message.content === '/font') {
        createMessageWindow(message.channel);
    }
});

function createMessageWindow(channel) {
    const embed = new Discord.MessageEmbed()
        .setColor('#00ff00')
        .setTitle('Pop-up Message Window')
        .setDescription('Create a pop-up message window on any website')
        .addField('FONT', 'Click the button to toggle the input and output fields')
        .setFooter('Bot created by YourUsername');

    channel.send({ embeds: [embed] }).then((sentMessage) => {
        sentMessage.react('🅰️');

        const filter = (reaction, user) => reaction.emoji.name === '🅰️' && user.id === message.author.id;
        const collector = sentMessage.createReactionCollector({ filter, time: 15000 });

        collector.on('collect', () => {
            const messageInput = 'Input text goes here';
            const convertedMessage = convertToUnicode(messageInput);

            const replyEmbed = new Discord.MessageEmbed()
                .setColor('#00ff00')
                .setTitle('Pop-up Message Window')
                .addField('Input', messageInput)
                .addField('Output', convertedMessage)
                .setFooter('Bot created by YourUsername');

            sentMessage.edit({ embeds: [replyEmbed] });
        });

        collector.on('end', () => {
            sentMessage.reactions.removeAll().catch(console.error);
        });
    });
}

function convertToUnicode(message) {
    const unicodeMap = {
        'A': 'ᗩ',
        'B': 'ᗷ',
        'C': 'ᑕ',
        'D': 'ᗪ',
        'E': 'ᗴ',
        'F': 'ᖴ',
        'G': 'Ǥ',
        'H': 'ᕼ',
        'I': 'I',
        'J': 'ᒎ',
        'K': 'ᛕ',
        'L': 'ᒪ',
        'M': 'ᗰ',
        'N': 'ᑎ',
        'O': 'ᗝ',
        'P': 'ᑭ',
        'Q': 'Ɋ',
        'R': 'ᖇ',
        'S': 'ᔕ',
        'T': '丅',
        'U': 'ᑌ',
        'V': 'ᐯ',
        'W': 'ᗯ',
        'X': '᙭',
        'Y': 'Ƴ',
        'Z': '乙',
        '0': '੦',
        '9': '੧',
        '2': '੨',
        '3': '੩',
        '1': '౹',
        '4': '੫',
        '5': 'Ƽ',
        '6': 'Ϭ',
        '7': 'Դ',
        '8': '੪',
    };

    return Array.from(message.toUpperCase())
        .map((char) => unicodeMap[char] || char)
        .join('');
}

client.login('MTEwODgzNzM4MzQwMDYwNzc3NA.Gf9mNP.3eEkGWP3osZRdVyizYnDFmryL6MRjVSQx2VTlM');
