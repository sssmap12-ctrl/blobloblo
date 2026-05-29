/* ========================================
   STORY.JS — Сценарий: ~130 реплик, ветвление, фото
   ======================================== */

const STORY_NODES = {

  // ===================== АКТ 1: ЗНАКОМСТВО =====================

  "start": {
    messages: [
      { type: "text", text: "Привет! 👋" },
      { type: "text", text: "Мне дали твой номер... Надеюсь, ты не против? 😅" },
    ],
    choices: [
      { text: "Привет! Конечно не против, особенно если пишет такая милая девушка 😏", points: 3, next: "warm_start" },
      { text: "Привет, а ты кто?", points: 1, next: "neutral_start" },
      { text: "Мне не очень интересно", points: -1, next: "cold_start" },
    ],
  },

  "warm_start": {
    messages: [
      { type: "text", text: "Ого, сразу комплименты? 😳" },
      { type: "text", text: "Мне нравится... 😊" },
      { type: "text", text: "Я Хамари! А тебя как зовут?" },
      { type: "text", text: "Хотя я уже знаю... мне сказали что тебя зовут {name} 😄" },
    ],
    choices: [
      { text: "Хамари? Красивое имя, как и ты ✨", points: 3, next: "intro_continue" },
      { text: "Приятно познакомиться, Хамари! 😊", points: 2, next: "intro_continue" },
    ],
  },

  "neutral_start": {
    messages: [
      { type: "text", text: "Меня зовут Хамари! 😊" },
      { type: "text", text: "А ты {name}, да? Мне про тебя рассказывали" },
      { type: "text", text: "Говорили что ты интересный 🤔" },
    ],
    choices: [
      { text: "Интересный? А что ещё говорили? 😏", points: 2, next: "intro_continue" },
      { text: "Приятно познакомиться", points: 1, next: "intro_continue" },
    ],
  },

  "cold_start": {
    messages: [
      { type: "text", text: "Ой, ну не будь таким... 😢" },
      { type: "text", text: "Давай хотя бы познакомимся?" },
      { type: "text", text: "Я Хамари! Обещаю, со мной не скучно будет 😊" },
    ],
    choices: [
      { text: "Ладно, извини. Давай пообщаемся", points: 1, next: "intro_continue" },
      { text: "Ну убеди меня 🤨", points: 0, next: "intro_continue" },
    ],
  },

  "intro_continue": {
    messages: [
      { type: "text", text: "Так, {name}..." },
      { type: "text", text: "Расскажи мне что-нибудь о себе!" },
      { type: "text", text: "Чем увлекаешься? 🤔" },
    ],
    choices: [
      { text: "Люблю аниме и игры 🎮", points: 3, next: "hobbies_anime" },
      { text: "Спортом занимаюсь 💪", points: 1, next: "hobbies_sport" },
      { text: "Да так, всего понемногу", points: 1, next: "hobbies_casual" },
    ],
  },

  "hobbies_anime": {
    messages: [
      { type: "text", text: "СЕРЬЁЗНО?! 😍" },
      { type: "text", text: "Я тоже обожаю аниме!" },
      { type: "text", text: "Какое последнее смотрел?" },
      { type: "text", text: "Я вот недавно пересматривала Тетрадь Смерти 📓" },
    ],
    choices: [
      { text: "О, у тебя отличный вкус! А что ещё смотришь?", points: 2, next: "hobby_deep" },
      { text: "Тетрадь Смерти — классика! 🔥", points: 2, next: "hobby_deep" },
    ],
  },

  "hobbies_sport": {
    messages: [
      { type: "text", text: "Вау, спортсмен? 😳" },
      { type: "text", text: "Наверное в хорошей форме..." },
      { type: "text", text: "А я вот ленивая немного, хехе 😅" },
    ],
    choices: [
      { text: "Могу быть твоим тренером 😏", points: 3, next: "hobby_deep" },
      { text: "Ничего страшного, ты и так прекрасна ✨", points: 2, next: "hobby_deep" },
    ],
  },

  "hobbies_casual": {
    messages: [
      { type: "text", text: "Скромничаешь? 😏" },
      { type: "text", text: "Ну ладно, со временем узнаю 😊" },
    ],
    choices: [
      { text: "Может и узнаешь, если постараешься 😏", points: 2, next: "hobby_deep" },
      { text: "Расскажи лучше о себе", points: 1, next: "hobby_deep" },
    ],
  },

  "hobby_deep": {
    messages: [
      { type: "text", text: "Знаешь, {name}..." },
      { type: "text", text: "Мне нравится с тобой общаться 😊" },
      { type: "text", text: "С тобой как-то... легко" },
      { type: "text", text: "Обычно я стесняюсь с новыми людьми" },
    ],
    choices: [
      { text: "Мне тоже с тобой классно ❤️", points: 3, next: "first_evening" },
      { text: "Ты милая, чего стесняться 😊", points: 2, next: "first_evening" },
      { text: "Продолжай, мне интересно", points: 1, next: "first_evening" },
    ],
  },

  "first_evening": {
    messages: [
      { type: "text", text: "Ой, уже вечер! 🌙" },
      { type: "text", text: "Время так быстро пролетело..." },
      { type: "text", text: "Ты чем обычно вечером занимаешься?" },
    ],
    choices: [
      { text: "Ну вот, с тобой переписываюсь 😏💕", points: 3, next: "evening_chat" },
      { text: "Обычно смотрю что-нибудь, но сейчас интереснее", points: 2, next: "evening_chat" },
      { text: "Да ничего особенного", points: 1, next: "evening_chat" },
    ],
  },

  // ===================== АКТ 2: СБЛИЖЕНИЕ =====================

  "evening_chat": {
    messages: [
      { type: "text", text: "Хехе, мило 😊" },
      { type: "text", text: "Мне тоже нравится тебе писать..." },
    ],
    photoCheck: {
      minPoints: 5,
      photos: ["photo/обычные/1.jpg"],
      successMessages: [
        { type: "text", text: "Слушай, а хочешь селфи? 📸" },
        { type: "text", text: "Только что сделала..." },
        { type: "photo", src: "photo/обычные/1.jpg" },
        { type: "text", text: "Не суди строго 🙈" },
      ],
      failMessages: [
        { type: "text", text: "Ну ладно..." },
        { type: "text", text: "Может потом ещё поболтаем?" },
      ],
    },
    choices: [
      { text: "Ты прекрасна! 😍", points: 3, next: "next_day", requiresPhoto: true },
      { text: "Спасибо за фотку! Ты очень красивая ✨", points: 2, next: "next_day", requiresPhoto: true },
      { text: "Неплохо", points: 0, next: "next_day", requiresPhoto: true },
      { text: "Конечно, с удовольствием!", points: 1, next: "next_day", requiresNoPhoto: true },
    ],
  },

  "next_day": {
    messages: [
      { type: "text", text: "Доброе утро, {name}! ☀️" },
      { type: "text", text: "Как спалось? 😴" },
      { type: "text", text: "Мне снился странный сон..." },
    ],
    choices: [
      { text: "Доброе! Надеюсь, я тебе снился? 😏", points: 3, next: "morning_flirt" },
      { text: "Привет! Расскажи про сон 😊", points: 1, next: "morning_dream" },
      { text: "Нормально", points: 0, next: "morning_casual" },
    ],
  },

  "morning_flirt": {
    messages: [
      { type: "text", text: "Может быть... 😳" },
      { type: "text", text: "Не скажу! 🙈" },
      { type: "text", text: "Ты слишком самоуверенный, {name}" },
      { type: "text", text: "...но мне это нравится 💕" },
    ],
    choices: [
      { text: "А мне нравишься ты 😊❤️", points: 3, next: "appearance_talk" },
      { text: "Так расскажешь про сон? 🤔", points: 1, next: "appearance_talk" },
    ],
  },

  "morning_dream": {
    messages: [
      { type: "text", text: "Ну, мне снилось что я была на пляже... 🏖️" },
      { type: "text", text: "И кто-то держал меня за руку 🌊" },
      { type: "text", text: "Не знаю кто это был... 😳" },
    ],
    choices: [
      { text: "Может это был я? 😏💕", points: 2, next: "appearance_talk" },
      { text: "Романтичный сон! 🌅", points: 1, next: "appearance_talk" },
    ],
  },

  "morning_casual": {
    messages: [
      { type: "text", text: "Немногословный сегодня? 😅" },
      { type: "text", text: "Ну ладно..." },
    ],
    choices: [
      { text: "Прости, ещё не проснулся. Ты как? ☀️", points: 1, next: "appearance_talk" },
      { text: "Расскажи что-нибудь 😊", points: 0, next: "appearance_talk" },
    ],
  },

  "appearance_talk": {
    messages: [
      { type: "text", text: "Слушай, {name}..." },
      { type: "text", text: "А как ты выглядишь? 🤔" },
      { type: "text", text: "Мне интересно представить с кем я общаюсь" },
    ],
    photoCheck: {
      minPoints: 8,
      photos: ["photo/обычные/селфи с кровати.jpg"],
      successMessages: [
        { type: "text", text: "Вот я, например, только проснулась..." },
        { type: "photo", src: "photo/обычные/селфи с кровати.jpg" },
        { type: "text", text: "Не накрашенная и всё такое 🙈" },
      ],
      failMessages: [
        { type: "text", text: "Ладно, может потом покажемся друг другу 😊" },
      ],
    },
    choices: [
      { text: "Ты и без макияжа богиня 😍🔥", points: 3, next: "new_clothes", requiresPhoto: true },
      { text: "Милашка! 😊", points: 2, next: "new_clothes", requiresPhoto: true },
      { text: "Нормально 👍", points: 0, next: "new_clothes", requiresPhoto: true },
      { text: "Я симпатичный, поверь 😏", points: 1, next: "new_clothes", requiresNoPhoto: true },
      { text: "Обычный парень 🤷", points: 0, next: "new_clothes", requiresNoPhoto: true },
    ],
  },

  "new_clothes": {
    messages: [
      { type: "text", text: "О, {name}! Угадай что! 🎉" },
      { type: "text", text: "Я купила себе новую одежду!" },
      { type: "text", text: "Хочешь покажу? 👗✨" },
    ],
    photoCheck: {
      minPoints: 12,
      photos: ["photo/обычные/новая одежда.jpg"],
      successMessages: [
        { type: "text", text: "Тадааам! ✨" },
        { type: "photo", src: "photo/обычные/новая одежда.jpg" },
        { type: "text", text: "Ну как тебе? Я долго выбирала... 😊" },
      ],
      failMessages: [
        { type: "text", text: "Хмм, знаешь..." },
        { type: "text", text: "Я стесняюсь немного 😅" },
        { type: "text", text: "Может потом покажу!" },
      ],
    },
    choices: [
      { text: "Вау, тебе очень идёт! Ты просто модель! 🔥✨", points: 3, next: "personal_questions", requiresPhoto: true },
      { text: "Красивая одежда! 👍", points: 1, next: "personal_questions", requiresPhoto: true },
      { text: "Не стесняйся, я уверен ты красотка 😏", points: 2, next: "personal_questions", requiresNoPhoto: true },
      { text: "Как хочешь 🤷", points: -1, next: "personal_questions", requiresNoPhoto: true },
    ],
  },

  "personal_questions": {
    messages: [
      { type: "text", text: "Слушай, {name}..." },
      { type: "text", text: "А у тебя есть девушка? 🤔" },
      { type: "text", text: "Просто интересно..." },
    ],
    choices: [
      { text: "Нет, свободен. А почему спрашиваешь? 😏", points: 4, next: "relationship_talk" },
      { text: "Нет, пока не встретил ту самую 💕", points: 2, next: "relationship_talk" },
      { text: "А тебе какая разница? 🤨", points: -2, next: "relationship_talk" },
    ],
  },

  "relationship_talk": {
    messages: [
      { type: "text", text: "Да так просто... 😳" },
      { type: "text", text: "Не хочу чтобы кто-то ревновал к нашей переписке" },
      { type: "text", text: "Хотя..." },
      { type: "text", text: "Мне нравится тебе писать, {name} 💕" },
    ],
    choices: [
      { text: "Мне тоже. Ты особенная 💕✨", points: 3, next: "late_night" },
      { text: "Мне тоже нравится 😊", points: 2, next: "late_night" },
      { text: "Мы же просто друзья 🤷", points: -1, next: "late_night" },
    ],
  },

  "late_night": {
    messages: [
      { type: "text", text: "Уже так поздно... 🌙" },
      { type: "text", text: "Не могу уснуть" },
      { type: "text", text: "Всё думаю о..." },
      { type: "text", text: "...разном 😳" },
    ],
    choices: [
      { text: "Я тоже не сплю. Думаю о тебе 😏💕", points: 4, next: "late_thoughts" },
      { text: "О чём думаешь? Расскажи мне 💭", points: 3, next: "late_thoughts" },
      { text: "Попробуй посчитать овечек 🐑", points: 0, next: "late_thoughts" },
    ],
  },

  "late_thoughts": {
    messages: [
      { type: "text", text: "Ну..." },
      { type: "text", text: "Ты обещаешь не смеяться? 🥺" },
      { type: "text", text: "Я думала о нас..." },
      { type: "text", text: "О том как было бы если бы мы встретились вживую" },
      { type: "text", text: "Ты бы обнял меня? 🤗" },
    ],
    choices: [
      { text: "Я бы не только обнял... 😏🔥", points: 4, next: "shower_scene" },
      { text: "Конечно обнял бы, крепко-крепко ❤️", points: 3, next: "shower_scene" },
      { text: "Наверное 🤔", points: 0, next: "shower_scene" },
    ],
  },

  // ===================== АКТ 3: ФЛИРТ =====================

  "shower_scene": {
    messages: [
      { type: "text", text: "Подожди, я сейчас 🚿" },
      { type: "text", text: "..." },
      { type: "text", text: "Всё, вышла из душа!" },
    ],
    photoChecks: [
      {
        minPoints: 20,
        photos: ["photo/средние/с душа.jpg"],
        successMessages: [
          { type: "text", text: "Сделала фотку для тебя... 😳" },
          { type: "text", text: "Только никому не показывай!!" },
          { type: "photo", src: "photo/средние/с душа.jpg" },
        ],
        failMessages: null,
      },
      {
        minPoints: 15,
        photos: ["photo/обычные/с душа.jpg"],
        successMessages: [
          { type: "text", text: "Вот, только вышла 😊" },
          { type: "photo", src: "photo/обычные/с душа.jpg" },
        ],
        failMessages: [
          { type: "text", text: "Было жарко 😅" },
          { type: "text", text: "Жаль, не сфоткалась для тебя" },
        ],
      },
    ],
    choices: [
      { text: "О боже... ты невероятная 🔥😍", points: 4, next: "jealousy_test", requiresPhoto: true },
      { text: "Вау, спасибо за доверие 💕", points: 3, next: "jealousy_test", requiresPhoto: true },
      { text: "Красотка! 😍", points: 2, next: "jealousy_test", requiresPhoto: true },
      { text: "Жаль что я не видел 😏", points: 1, next: "jealousy_test", requiresNoPhoto: true },
      { text: "Понятно 👍", points: 0, next: "jealousy_test", requiresNoPhoto: true },
    ],
  },

  "jealousy_test": {
    messages: [
      { type: "text", text: "{name}..." },
      { type: "text", text: "Я тут видела у тебя в друзьях одну девушку... 👀" },
      { type: "text", text: "Кто это? 😤" },
      { type: "text", text: "(шучу... или нет 🤔)" },
    ],
    choices: [
      { text: "Ревнуешь? Мне нравится только ты 😏💕", points: 4, next: "after_jealousy" },
      { text: "Это просто подруга, не волнуйся ❤️", points: 2, next: "after_jealousy" },
      { text: "А тебе какое дело? 🤨", points: -3, next: "after_jealousy" },
    ],
  },

  "after_jealousy": {
    messages: [
      { type: "text", text: "Хехе 😊" },
    ],
    photoCheck: {
      minPoints: 22,
      photos: ["photo/средние/ножки.jpg"],
      successMessages: [
        { type: "text", text: "Мне нравится когда ты так говоришь 🥰" },
        { type: "text", text: "Хочу тебе кое-что показать..." },
        { type: "text", text: "Оценишь? 😳" },
        { type: "photo", src: "photo/средние/ножки.jpg" },
      ],
      failMessages: [
        { type: "text", text: "Ладно, верю... 😊" },
        { type: "text", text: "Наверное 🤔" },
      ],
    },
    choices: [
      { text: "У тебя идеальные ножки! 😍🔥", points: 3, next: "trust_building", requiresPhoto: true },
      { text: "Красиво! 😊", points: 2, next: "trust_building", requiresPhoto: true },
      { text: "Ты мне правда нравишься 💕", points: 2, next: "trust_building", requiresNoPhoto: true },
      { text: "Давай о чём-нибудь поговорим 🤷", points: 0, next: "trust_building", requiresNoPhoto: true },
    ],
  },

  "trust_building": {
    messages: [
      { type: "text", text: "Знаешь, {name}..." },
      { type: "text", text: "Я обычно не такая открытая с людьми" },
      { type: "text", text: "Но с тобой мне почему-то... комфортно 🥰" },
      { type: "text", text: "Ты вызываешь у меня доверие" },
      { type: "text", text: "Это немного пугает, если честно" },
    ],
    choices: [
      { text: "Не бойся, я тебя не обижу. Доверься мне 💕", points: 4, next: "flirt_escalation" },
      { text: "Мне тоже комфортно с тобой ❤️", points: 3, next: "flirt_escalation" },
      { text: "Это нормально 👍", points: 0, next: "flirt_escalation" },
    ],
  },

  "flirt_escalation": {
    messages: [
      { type: "text", text: "Мне сейчас скучно... 😩" },
      { type: "text", text: "И я подумала..." },
      { type: "text", text: "Хочешь поиграем? 😏" },
      { type: "text", text: "Правда или действие?" },
    ],
    choices: [
      { text: "Действие, конечно! 😏🔥", points: 4, next: "dare_path" },
      { text: "Правда! Спрашивай 😊", points: 2, next: "truth_path" },
    ],
  },

  "dare_path": {
    messages: [
      { type: "text", text: "Смелый! 😳" },
      { type: "text", text: "Ладно, моё действие для тебя..." },
      { type: "text", text: "Скажи мне что-нибудь такое, от чего я покраснею 😳" },
    ],
    choices: [
      { text: "Хочу оказаться рядом и поцеловать тебя прямо сейчас 💋", points: 5, next: "dare_response" },
      { text: "Ты самая красивая девушка которую я встречал ❤️", points: 3, next: "dare_response" },
    ],
  },

  "truth_path": {
    messages: [
      { type: "text", text: "Окей..." },
      { type: "text", text: "Скажи честно..." },
      { type: "text", text: "Ты когда-нибудь думал обо мне... ну... не просто как о подруге? 😳" },
    ],
    choices: [
      { text: "Да, ты мне снишься по ночам... 😏💕", points: 4, next: "dare_response" },
      { text: "Может быть... ты мне нравишься 😊", points: 3, next: "dare_response" },
    ],
  },

  "dare_response": {
    messages: [
      { type: "text", text: "Ой... 😳😳😳" },
      { type: "text", text: "У меня сердце сейчас выпрыгнет!" },
    ],
    photoCheck: {
      minPoints: 25,
      photos: ["photo/средние/с языком.jpg"],
      successMessages: [
        { type: "text", text: "Вот что ты со мной делаешь..." },
        { type: "photo", src: "photo/средние/с языком.jpg" },
        { type: "text", text: "Это тебе... 💕" },
      ],
      failMessages: [
        { type: "text", text: "Ты такой... 😊" },
        { type: "text", text: "Мне нужно ещё немного привыкнуть 🙈" },
      ],
    },
    choices: [
      { text: "Господи, ты сводишь меня с ума 🔥😍", points: 4, next: "intimate_start", requiresPhoto: true },
      { text: "Какая ты... дерзкая 😏💕", points: 3, next: "intimate_start", requiresPhoto: true },
      { text: "Ты тоже мне нравишься 💕", points: 2, next: "intimate_start", requiresNoPhoto: true },
    ],
  },

  // ===================== АКТ 4: ДОВЕРИЕ =====================

  "intimate_start": {
    messages: [
      { type: "text", text: "{name}, я хочу тебе кое в чём признаться..." },
      { type: "text", text: "Когда мы не переписываемся..." },
      { type: "text", text: "Я скучаю 🥺" },
      { type: "text", text: "Прям сильно-сильно" },
    ],
    choices: [
      { text: "Я тоже схожу с ума без тебя 💕🔥", points: 4, next: "intimate_confession" },
      { text: "Ты тоже мне очень нужна ❤️", points: 3, next: "intimate_confession" },
      { text: "Это мило 😊", points: 0, next: "intimate_confession" },
    ],
  },

  "intimate_confession": {
    messages: [
      { type: "text", text: "Помнишь я покупала новую кофту?.. 😊" },
    ],
    photoCheck: {
      minPoints: 28,
      photos: ["photo/средние/интим в новой кофте.jpg"],
      successMessages: [
        { type: "text", text: "Хочу показать... по-другому 😳" },
        { type: "text", text: "Я никому такое не отправляла..." },
        { type: "photo", src: "photo/средние/интим в новой кофте.jpg" },
        { type: "text", text: "Нравится?.. 🙈" },
      ],
      failMessages: [
        { type: "text", text: "Иногда мне кажется, что ты мог бы стараться больше... 😔" },
        { type: "text", text: "Но всё равно, ты мне нравишься" },
      ],
    },
    choices: [
      { text: "Ты нереально красивая... Я не могу отвести взгляд 😍🔥", points: 4, next: "deep_night", requiresPhoto: true },
      { text: "Вау, спасибо за доверие! Ты прекрасна 💕", points: 3, next: "deep_night", requiresPhoto: true },
      { text: "Я постараюсь! Ты того стоишь 💕", points: 2, next: "deep_night", requiresNoPhoto: true },
      { text: "Спасибо за честность 😊", points: 1, next: "deep_night", requiresNoPhoto: true },
    ],
  },

  "deep_night": {
    messages: [
      { type: "text", text: "Уже 3 часа ночи... ⏰" },
      { type: "text", text: "Я лежу в кровати и не могу уснуть 😩" },
      { type: "text", text: "Все мысли о тебе..." },
      { type: "text", text: "Хотела бы сейчас быть рядом с тобой" },
    ],
    choices: [
      { text: "Я тоже хочу быть рядом... и не только обнять 😏🔥", points: 5, next: "bed_scene" },
      { text: "Я бы обнял тебя, и мы бы заснули вместе 💕", points: 3, next: "bed_scene" },
      { text: "Спи давай 😴", points: -1, next: "bed_scene" },
    ],
  },

  "bed_scene": {
    messages: [
      { type: "text", text: "Ты такой... 😳" },
    ],
    photoCheck: {
      minPoints: 30,
      photos: ["photo/средние/на кровате в трусах.jpg"],
      successMessages: [
        { type: "text", text: "Ладно, раз ты хочешь быть рядом..." },
        { type: "text", text: "Представь что я вот так рядом с тобой..." },
        { type: "photo", src: "photo/средние/на кровате в трусах.jpg" },
        { type: "text", text: "Теперь ты точно не уснёшь 😏" },
      ],
      failMessages: [
        { type: "text", text: "Ладно, попробую уснуть... 😴" },
        { type: "text", text: "Спокойной ночи, {name} 💕" },
      ],
    },
    choices: [
      { text: "Как же ты прекрасна... я сейчас с ума сойду 🔥😍", points: 5, next: "medium_unlock", requiresPhoto: true },
      { text: "Ты невероятная 💕", points: 3, next: "medium_unlock", requiresPhoto: true },
      { text: "Спокойной ночи, красотка 💕", points: 2, next: "medium_unlock", requiresNoPhoto: true },
    ],
  },

  "medium_unlock": {
    messages: [
      { type: "text", text: "Утро! ☀️" },
      { type: "text", text: "Я думала о вчерашнем..." },
      { type: "text", text: "И решила, что хочу быть с тобой ещё откровеннее" },
    ],
    photoCheck: {
      minPoints: 32,
      photos: ["photo/средние/интимки.jpg", "photo/средние/интим в новой кофте 2jpg.jpg"],
      successMessages: [
        { type: "text", text: "Я никому такое не отправляла..." },
        { type: "text", text: "Но ты... ты особенный для меня, {name}" },
        { type: "photo", src: "photo/средние/интимки.jpg" },
        { type: "text", text: "И ещё..." },
        { type: "photo", src: "photo/средние/интим в новой кофте 2jpg.jpg" },
        { type: "text", text: "Не молчи... 🙈" },
      ],
      failMessages: [
        { type: "text", text: "Но мне нужно больше уверенности в тебе..." },
        { type: "text", text: "Со временем, ладно? 💕" },
      ],
    },
    choices: [
      { text: "Хамари... ты самая красивая на свете. Я в шоке 😍🔥💕", points: 5, next: "hard_path", requiresPhoto: true },
      { text: "Спасибо за доверие, ты прекрасна ❤️", points: 3, next: "hard_path", requiresPhoto: true },
      { text: "Я понимаю, не торопись 💕", points: 2, next: "hard_path", requiresNoPhoto: true },
      { text: "Жаль... 😕", points: 0, next: "hard_path", requiresNoPhoto: true },
    ],
  },

  // ===================== АКТ 5: КУЛЬМИНАЦИЯ =====================

  "hard_path": {
    messages: [
      { type: "text", text: "{name}..." },
      { type: "text", text: "Ты помнишь, я говорила что с тобой мне комфортно?" },
      { type: "text", text: "Это правда..." },
      { type: "text", text: "Я хочу показать тебе себя настоящую" },
      { type: "text", text: "Без масок, без фильтров" },
      { type: "text", text: "Ты готов? 🥺" },
    ],
    choices: [
      { text: "Я всегда готов. Ты можешь доверять мне полностью 💕", points: 5, next: "hard_unlock_1" },
      { text: "Покажи мне. Я хочу знать настоящую тебя ❤️", points: 4, next: "hard_unlock_1" },
      { text: "Давай 👍", points: 1, next: "hard_unlock_1" },
    ],
  },

  "hard_unlock_1": {
    messages: [],
    photoCheck: {
      minPoints: 35,
      photos: ["photo/хард/интим.jpg", "photo/хард/с душа2.jpg"],
      successMessages: [
        { type: "text", text: "Окей... глубокий вдох... 😳" },
        { type: "text", text: "Эти фото... я делала их только для себя" },
        { type: "text", text: "Но сейчас я хочу поделиться с тобой" },
        { type: "photo", src: "photo/хард/интим.jpg" },
        { type: "text", text: "..." },
        { type: "photo", src: "photo/хард/с душа2.jpg" },
        { type: "text", text: "Ну вот... теперь ты видел 😳" },
      ],
      failMessages: [
        { type: "text", text: "Я бы хотела..." },
        { type: "text", text: "Но мне кажется, мы ещё не настолько близки 😔" },
        { type: "text", text: "Прости..." },
      ],
    },
    choices: [
      { text: "Хамари... ты совершенство. Спасибо за доверие 😍💕", points: 5, next: "hard_unlock_2", requiresPhoto: true },
      { text: "Ты невероятная... 🔥❤️", points: 3, next: "hard_unlock_2", requiresPhoto: true },
      { text: "Ничего, я подожду. Ты того стоишь 💕", points: 3, next: "hard_unlock_2", requiresNoPhoto: true },
      { text: "Как хочешь 🤷", points: -1, next: "hard_unlock_2", requiresNoPhoto: true },
    ],
  },

  "hard_unlock_2": {
    messages: [
      { type: "text", text: "Знаешь что, {name}?" },
      { type: "text", text: "Ты единственный человек которому я так доверяю" },
      { type: "text", text: "И я хочу чтобы ты это знал" },
    ],
    photoCheck: {
      minPoints: 40,
      photos: [
        "photo/хард/интимки Хамари_Мизусима.jpg",
        "photo/хард/интимки Хамари_Мизусима 2.jpg",
        "photo/хард/интимки Хамари_Мизусима 3.jpg",
      ],
      successMessages: [
        { type: "text", text: "Я сделала для тебя целую фотосессию... 📸" },
        { type: "text", text: "Надеюсь тебе понравится..." },
        { type: "photo", src: "photo/хард/интимки Хамари_Мизусима.jpg" },
        { type: "photo", src: "photo/хард/интимки Хамари_Мизусима 2.jpg" },
        { type: "photo", src: "photo/хард/интимки Хамари_Мизусима 3.jpg" },
        { type: "text", text: "Это всё для тебя... 💕" },
      ],
      failMessages: [
        { type: "text", text: "Со временем... я покажу тебе больше 😊" },
        { type: "text", text: "Нужно ещё немного терпения" },
      ],
    },
    choices: [
      { text: "Хамари, ты нереальная... Не могу перестать смотреть 🔥😍💕", points: 5, next: "hard_unlock_3", requiresPhoto: true },
      { text: "Лучшая фотосессия в мире ❤️🔥", points: 3, next: "hard_unlock_3", requiresPhoto: true },
      { text: "Я буду ждать 💕", points: 2, next: "hard_unlock_3", requiresNoPhoto: true },
    ],
  },

  "hard_unlock_3": {
    messages: [
      { type: "text", text: "Мне сейчас так жарко... 🥵" },
      { type: "text", text: "Наверное из-за тебя" },
      { type: "text", text: "Ты делаешь что-то со мной, {name}..." },
    ],
    photoCheck: {
      minPoints: 45,
      photos: [
        "photo/хард/интимки Хамари_Мизусима 4.jpg",
        "photo/хард/интимки Хамари_Мизусима 5.jpg",
        "photo/хард/интимки Хамари_Мизусима 6.jpg",
      ],
      successMessages: [
        { type: "text", text: "Вот, смотри..." },
        { type: "photo", src: "photo/хард/интимки Хамари_Мизусима 4.jpg" },
        { type: "photo", src: "photo/хард/интимки Хамари_Мизусима 5.jpg" },
        { type: "photo", src: "photo/хард/интимки Хамари_Мизусима 6.jpg" },
        { type: "text", text: "Тебе нравится?.. 😳💕" },
      ],
      failMessages: [
        { type: "text", text: "Но я пока не готова показать больше..." },
        { type: "text", text: "Не расстраивайся 😊" },
      ],
    },
    choices: [
      { text: "Ты сводишь меня с ума, Хамари... хочу видеть ещё 🔥😍", points: 5, next: "final_unlock", requiresPhoto: true },
      { text: "Невероятно... ❤️🔥", points: 3, next: "final_unlock", requiresPhoto: true },
      { text: "Я понимаю 💕", points: 2, next: "final_unlock", requiresNoPhoto: true },
    ],
  },

  "final_unlock": {
    messages: [
      { type: "text", text: "{name}..." },
      { type: "text", text: "Ты прошёл все мои тесты 😊" },
      { type: "text", text: "Ты терпеливый, нежный, и заботливый" },
      { type: "text", text: "Такие парни — редкость ✨" },
    ],
    photoCheck: {
      minPoints: 50,
      photos: [
        "photo/хард/интимки Хамари_Мизусима 7.jpg",
        "photo/хард/интимки Хамари_Мизусима 8.jpg",
      ],
      successMessages: [
        { type: "text", text: "И за это..." },
        { type: "text", text: "Ты заслужил увидеть всё 😳" },
        { type: "photo", src: "photo/хард/интимки Хамари_Мизусима 7.jpg" },
        { type: "photo", src: "photo/хард/интимки Хамари_Мизусима 8.jpg" },
        { type: "text", text: "Вот и всё... теперь ты видел меня полностью 💕" },
      ],
      failMessages: [
        { type: "text", text: "Но мне всё ещё чего-то не хватает..." },
        { type: "text", text: "Может если начнём сначала?" },
      ],
    },
    choices: [
      { text: "Хамари... ты лучшее, что случилось в моей жизни 😍💕❤️", points: 5, next: "ending_good", requiresPhoto: true },
      { text: "Спасибо за всё 💕", points: 3, next: "ending_good", requiresPhoto: true },
      { text: "Может быть, в следующий раз 💕", points: 0, next: "ending_neutral", requiresNoPhoto: true },
    ],
  },

  // ===================== КОНЦОВКИ =====================

  "ending_good": {
    messages: [
      { type: "text", text: "😊💕❤️" },
      { type: "text", text: "{name}, я так рада что мы познакомились" },
      { type: "text", text: "Ты особенный для меня" },
      { type: "text", text: "Давай никогда не прекращать общаться?" },
      { type: "text", text: "Я буду ждать тебя здесь... всегда 💕" },
      { type: "text", text: "Твоя Хамари 😘" },
    ],
    isEnding: true,
    endingType: "good",
  },

  "ending_neutral": {
    messages: [
      { type: "text", text: "Ну что ж..." },
      { type: "text", text: "Было интересно пообщаться, {name}" },
      { type: "text", text: "Может когда-нибудь ты вернёшься" },
      { type: "text", text: "И в этот раз будешь более... открытым? 😊" },
      { type: "text", text: "До встречи... 💋" },
    ],
    isEnding: true,
    endingType: "neutral",
  },

};


// ===================== ГАЛЕРЕЯ ФОТО =====================

const PHOTO_GALLERY = [
  // Обычные (easy) — 4 фото
  { id: 1,  path: "photo/обычные/1.jpg",                name: "Первое селфи",              tier: "easy" },
  { id: 2,  path: "photo/обычные/селфи с кровати.jpg",   name: "Утреннее селфи",             tier: "easy" },
  { id: 3,  path: "photo/обычные/новая одежда.jpg",      name: "Новая одежда",               tier: "easy" },
  { id: 4,  path: "photo/обычные/с душа.jpg",            name: "После душа",                 tier: "easy" },

  // Средние (medium) — 7 фото
  { id: 5,  path: "photo/средние/с душа.jpg",                      name: "После душа (откровенное)", tier: "medium" },
  { id: 6,  path: "photo/средние/ножки.jpg",                       name: "Ножки",                    tier: "medium" },
  { id: 7,  path: "photo/средние/с языком.jpg",                    name: "Игривое фото",             tier: "medium" },
  { id: 8,  path: "photo/средние/интим в новой кофте.jpg",         name: "В новой кофте",            tier: "medium" },
  { id: 9,  path: "photo/средние/на кровате в трусах.jpg",        name: "На кровати",               tier: "medium" },
  { id: 10, path: "photo/средние/интимки.jpg",                     name: "Интимное фото",            tier: "medium" },
  { id: 11, path: "photo/средние/интим в новой кофте 2jpg.jpg",   name: "В новой кофте 2",          tier: "medium" },

  // Хард (hard) — 10 фото
  { id: 12, path: "photo/хард/интим.jpg",                          name: "Интим",                    tier: "hard" },
  { id: 13, path: "photo/хард/с душа2.jpg",                        name: "После душа (хард)",        tier: "hard" },
  { id: 14, path: "photo/хард/интимки Хамари_Мизусима.jpg",       name: "Фотосессия #1",            tier: "hard" },
  { id: 15, path: "photo/хард/интимки Хамари_Мизусима 2.jpg",     name: "Фотосессия #2",            tier: "hard" },
  { id: 16, path: "photo/хард/интимки Хамари_Мизусима 3.jpg",     name: "Фотосессия #3",            tier: "hard" },
  { id: 17, path: "photo/хард/интимки Хамари_Мизусима 4.jpg",     name: "Фотосессия #4",            tier: "hard" },
  { id: 18, path: "photo/хард/интимки Хамари_Мизусима 5.jpg",     name: "Фотосессия #5",            tier: "hard" },
  { id: 19, path: "photo/хард/интимки Хамари_Мизусима 6.jpg",     name: "Фотосессия #6",            tier: "hard" },
  { id: 20, path: "photo/хард/интимки Хамари_Мизусима 7.jpg",     name: "Фотосессия #7",            tier: "hard" },
  { id: 21, path: "photo/хард/интимки Хамари_Мизусима 8.jpg",     name: "Фотосессия #8",            tier: "hard" },
];
