
// for test
const TESTKON = ['IPv6是Internet Protocol Version',
'6的缩写，其中InterneProtocol译为“互联网协议”。',
'IPv6是IETF（互联网工程任务组，Internet Engineering Task Force）',
'设计的用于替代现行版本IP协议（IPv4）的下一代IP协议。',
'目前IP协议的版本号是4（简称为IPv4），它的下一个版本就是IPv6。'].join('')

var app = new Vue({
  data: {
    title: '答题助手',
    question: '',
    options: [],
    knowledge: '',
    answers: [],
    trueFlag: true,
  },

  watch: {},

  computed: {
    rightOption() {
      let rightOption = 'A';
      console.log(this.trueFlag, 'trueFlag');
      try {
        const rightAnswer = this.trueFlag ? this.answers[0][0] : this.answers[2][0];
        rightOption = {
          0: 'A',
          1: 'B',
          2: 'C',
        }[this.options.indexOf(rightAnswer)];
      } catch (e) {
        console.log(e);
      }
      return rightOption;
    }
  },

  filters: {},

  methods: {},

  directives: {},

  created() {
    // open a webSocket
    var ws = new WebSocket('ws://localhost:3000/ws/answer');
    ws.onmessage = (msg) => {
      const data = JSON.parse(msg.data);
      console.log(data);
      this.question = data.question || this.question;
      this.options = data.options || this.options;
      this.knowledge = data.knowledge || this.knowledge;
      this.answers = data.answers || this.answers;
      this.trueFlag = data.hasOwnProperty('trueFlag') ? data.trueFlag : this.trueFlag;
    };
  }
})

// mount
app.$mount('.answer');
