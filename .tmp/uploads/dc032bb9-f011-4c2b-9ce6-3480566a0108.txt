<template>
  <div>
    <v-container v-if="!isProductionMode">
      <v-layout align-center justify-center row fill-height>
        <v-flex xs12 pa-3 justify-center>
          <v-combobox v-model="config.form" :items="formList" label="Select form" @change="onChangeForm">
            <template slot="item" slot-scope="data">
              <span style="padding-left:1em;" class="caption">
                {{data.item.id}}: 
                {{ (data.item.metadata.app_name) ? data.item.metadata.app_name.value : ''}}:
                {{ (data.item.metadata.form_title) ? data.item.metadata.form_title.value : ''}} 
              </span>
            </template>
            <template slot="selection" slot-scope="data">
              <span style="padding-left:1em;" class="caption">
                {{data.item.id}}: 
                {{ (data.item.metadata.app_name) ? data.item.metadata.app_name.value : '' }}:
                {{ (data.item.metadata.form_title) ? data.item.metadata.form_title.value : '' }}
              </span>
            </template>
          </v-combobox>
        </v-flex>
      </v-layout>
      <v-divider></v-divider>
    </v-container>
    <v-container v-else>
      <v-divider></v-divider>
      <div v-if="formConfig">
        <div class="font-weight-light primary white--text pa-3 mb-2">
          <v-layout row align-center justify-end>
            <p class="ma-0 white--text" style="font-size:12px;">DJVUE FORMS REPORT</p>
          </v-layout>
          <h1 class="headline">
            {{formConfig.metadata.form_title.value}}
          </h1>
          <p class="subheading pl-3">
            {{formConfig.metadata.form_note.value}}
          </p>
        </div>
        <p class="body-1 secondary--text weight-light pl-3 ma-0">
          <b>{{translate('Last_update')}}</b> {{moment(new Date(formConfig.updatedAt)).format('YYYY-MM-DD')}}
        </p>
        <p class="body-1 secondary--text weight-light pl-3 ma-0">
          <b>{{translate('Application')}}</b> <a :href="formConfig.metadata.app_url.value" target="_blank">{{formConfig.metadata.app_name.value}}</a>
        </p>
        <p class="body-1 secondary--text weight-light pl-3 ma-0">
          <b>{{translate('Access_for')}}</b>
          &nbsp;{{translate(accessMode.text)}}
          &nbsp;{{ (formConfig.config.access.enabled) ? translate('Opened') : translate('Closed') }}
          &nbsp;{{(formConfig.config.access.lastNotificatedAt) ? moment(new Date(formConfig.config.access.lastNotificatedAt)).fromNow() : '' }}
        </p>
      </div>
      <div v-if="formStat">
        <p class="body-1 secondary--text weight-light pl-3 ma-0">
          <b>{{translate('Respondent_activity')}}</b>
          &nbsp;{{ translate('Total') }}
          &nbsp;{{ formStat.events.total }}
          &nbsp;{{ translate('Responses') }}
          &nbsp;( {{moment(new Date(formStat.events.range.min)).format('YYYY-MM-DD HH:mm')}} -
          &nbsp;{{moment(new Date(formStat.events.range.max)).format('YYYY-MM-DD HH:mm')}} )
        </p>
        <echart :options="chartOptions" height="250"></echart>
        <v-divider></v-divider>
      </div>
      <div v-if="formConfig">
        <div v-for="(q, q_index) in formConfig.config.questions" class="mt-3">
          <h2 class="headline font-weight-light primary--text">
            {{q_index+1}}. {{q.options.title}} <span v-if="q.options.required" class="caption warning--text">({{translate('Required')}})</span>
          </h2>
          <p class="body-1 secondary--text font-weight-light pl-3 ma-0">
            {{q.options.note}}
          </p>
          <h1 class="subheading primary--text pl-2">
            {{translate('Response_type')}} {{translate(q.options.type)}}
          </h1>
          <p v-if="q.options.type == 'One of many selection' || q.options.type == 'Many of many selection'" class="body-1 secondary--text weight-light pl-3 ma-0">
            <span v-if="q.options.type == 'Many of many selection'">
              {{translate('Respondent_shuld_select_between')}} {{q.options.rule.min}} {{translate('And')}} {{q.options.rule.max}} {{translate('Variants')}}. </span>
            <span v-if="q.options.addEnabled">{{translate('Respondent_can_add_max')}} {{q.options.maxCustomResponses}} {{translate('Self_variants')}}. </span>
            <span v-if="q.options.userCollaboration">{{translate('Respondents_collaboration_detected')}}.</span>
          </p>
          <p v-if="q.options.type == 'Range'" class="body-1 secondary--text weight-light pl-3 ma-0">
            {{translate('Range_between')}} {{q.options.range[0]}} {{translate('And')}} {{q.options.range[1]}} {{translate('By_step')}} {{q.options.step}}
          </p>
          <p v-if="q.options.nominals" class="body-1 secondary--text weight-light pl-3  pt-2 ma-0">
            <b>{{translate('Nominals')}}</b>
            <ul>
              <li v-for="n in q.options.nominals">
                {{n.title}}
              </li>
            </ul>
          </p>
          <p v-if="q.options.entities" class="body-1 secondary--text weight-light pl-3 ma-0 pt-2">
            <b>{{translate('Entities')}}</b>
            <ul>
              <li v-for="e in q.options.entities">
                {{e.title}}
              </li>
            </ul>
          </p>
          <p v-if="q.options.factors" class="body-1 secondary--text weight-light pl-3 ma-0 pt-2">
            <b>{{translate('Factors')}}</b>
            <ul>
              <li v-for="f in q.options.factors">
                {{f.title}}
              </li>
            </ul>
          </p>
          <p v-if="q.options.effects" class="body-1 secondary--text weight-light pl-3 ma-0 pt-2">
            <b>{{translate('Effects')}}</b>
            <ul>
              <li v-for="e in q.options.effects">
                {{e.title}}
              </li>
            </ul>
          </p>
          <p v-if="q.options.scale" class="body-1 secondary--text weight-light pl-3 ma-0 pt-2">
            <b>{{translate('Scale')}}</b>
            <ul>
              <li v-for="s in q.options.scale">
                {{s.value}} ( {{s.title}} )
              </li>
            </ul>
          </p>
          <div v-if="formStat">
            <h1 class="subheading primary--text mt-3 pl-2">
              {{translate('Statistic')}}
            </h1>
            <v-card v-if="q.options.type=='Influence'" flat color="transparent" class="mt-3">
              <v-layout fill-height row>
                <v-flex xs2 pa-2 class="text-xs-center headline" style="border-left:1px solid #dedede; border-bottom:1px solid #dcdcdc;  border-top:1px solid #dcdcdc;">
                </v-flex>
                <v-flex v-for="(e, idx) in q.options.effects" :class="`${cellClass(q)} text-xs-center`" :style="`
                      min-height:3em; 
                      border-left:1px solid #dedede; 
                      border-bottom:1px solid #dcdcdc;  
                      border-top:1px solid #dcdcdc;
                      ${ (idx == (q.options.effects.length-1)) ? 'border-right: 1px solid #dcdcdc !important;' : ''}
                    `">
                  <span class="caption">{{e.title}}</span>
                </v-flex>
              </v-layout>
              <v-layout fill-height row v-for="(f, index1) in q.options.factors">
                <v-flex xs2 pa-2 class="caption" align-center style="border-left: 1px solid #dcdcdc;
                    border-bottom:1px solid #dcdcdc; ">
                  {{f.title}}
                </v-flex>
                <v-flex v-for="(e, index2) in q.options.effects" :class="`${cellClass(q)} text-xs-center`" :style="`
                    min-height:3em; 
                    border-left: 1px solid #dcdcdc;
                    border-bottom:1px solid #dcdcdc; 
                    ${ (index2 < (q.options.effects.length-1)) ? '' :'border-right: 1px solid #dcdcdc !important;'}
                  `" align-center>
                  <v-layout align-center style="height:100%;">
                    <v-flex class="text-xs-center body-2">
                      <echart v-if="getChart(q,f,e)" :options="getChart(q,f,e)" height="150"></echart>
                    </v-flex>
                  </v-layout>
                  <v-layout v-else style="height:100%;"></v-layout>
                </v-flex>
              </v-layout>
            </v-card>
            <v-card v-if="q.options.type=='Association'" flat color="transparent" class="mt-3">
              <v-layout fill-height row>
                <v-flex xs2 pa-2 class="text-xs-center headline" style="border-left:1px solid #dedede; border-bottom:1px solid #dcdcdc;  border-top:1px solid #dcdcdc;">
                </v-flex>
                <v-flex v-for="(e, idx) in q.options.entities" :class="`${cellClass(q)} text-xs-center`" :style="`
                      min-height:3em; 
                      border-left:1px solid #dedede; 
                      border-bottom:1px solid #dcdcdc;  
                      border-top:1px solid #dcdcdc;
                      ${ (idx == (q.options.entities.length-1)) ? 'border-right: 1px solid #dcdcdc !important;' : ''}
                    `">
                  <span class="caption">{{e.title}}</span>
                </v-flex>
              </v-layout>
              <v-layout fill-height row v-for="(f, index1) in q.options.entities">
                <v-flex xs2 pa-2 class="caption" align-center style="border-left: 1px solid #dcdcdc;
                    border-bottom:1px solid #dcdcdc; ">
                  {{f.title}}
                </v-flex>
                <v-flex v-for="(e, index2) in q.options.entities" :class="`${cellClass(q)} text-xs-center`" :style="`
                    min-height:3em; 
                    border-left: 1px solid #dcdcdc;
                    border-bottom:1px solid #dcdcdc; 
                    ${ (index2 < (q.options.entities.length-1)) ? '' :'border-right: 1px solid #dcdcdc !important;'}
                  `" align-center>
                  <v-layout v-if="index2 > index1" align-center style="height:100%;">
                    <v-flex class="text-xs-center body-2">
                      <echart v-if="getChart(q,f,e)" :options="getChart(q,f,e)" height="150"></echart>
                    </v-flex>
                  </v-layout>
                  <v-layout v-else style="height:100%;"></v-layout>
                </v-flex>
              </v-layout>
            </v-card>
            <echart v-if="q.options.type != 'Association' && q.options.type != 'Influence'" :options="q.chartOptions" height="250"></echart>
          </div>
        </div>
      </div>
    </v-container>
    <!-- <pre class="caption primary">
      {{JSON.stringify(formConfig, null,"\t")}}
    </pre>  
    <pre class="caption secondary">
      {{JSON.stringify(formStat, null,"\t")}}
    </pre>   -->
  </div>
</template>
<script>
import djvueMixin from "djvue/mixins/core/djvue.mixin.js";
import listenerMixin from "djvue/mixins/core/listener.mixin.js";
import i18nMixin from "djvue/mixins/core/widget-i18n.mixin.js"
import ioMixin from "./mixins/io.mixin.js"
import statMixin from "./mixins/stat.mixin.js"
import echart from "djvue/components/core/ext/echart.vue"


export default {

  name: "form-report-widget",

  icon: "mdi-view-dashboard-outline",

  mixins: [djvueMixin, listenerMixin, i18nMixin, ioMixin, statMixin],

  components: { echart },

  computed: {

    accessMode() {
      return {
        "any": { icon: "mdi-account", text: "Any_respondents" },
        "users": { icon: "mdi-account-key", text: "Logged_user" },
        "invited": { icon: "mdi-account-star", text: "Invited_respondents" }
      } [this.formConfig.config.access.type]
    }

  },

  methods: {

    getChart(question, e1, e2) {
      let f = (question.options.type == "Influence") ?
        _.find(question.chartOptions, s => s.factor.id == e1.id && s.effect.id == e2.id) :
        _.find(question.chartOptions, s => s.e1.id == e1.id && s.e2.id == e2.id)
      if (f) return f.chartOptions
      return null
    },

    cellClass(question) {
      let width = (question.options.type == "Influence") ?
        Math.trunc(10 / question.options.effects.length) :
        Math.trunc(10 / question.options.entities.length)
      width = (width > 3) ? 3 : width;
      return `xs${width}`
    },



    onPageStart() {
      if (this.config.form) {
        this.loadReport(this.config.form)
      }
    },

    loadReport(form) {
      this.loadForm(form.id)
        .then(res => {
          this.formConfig = res;
          let locale = this.formConfig.config.locale || "en";
          this.setLocale(locale);
          this.getStat(form.id)
            .then(res => {
              this.formStat = res
              this.getChartOptions()
              this.formConfig.config.questions.forEach(q => {
                q.chartOptions = this.getQuestionChartOptions(q, this.formStat)
              })
            })
        })
    },

    onChangeForm(form) {
      this.loadReport(form);
      this.setNeedSave(true)
    },

    getChartOptions() {
      let d = this.getResponseDynamic(this.formStat)

      this.chartOptions = {

        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },

        color: [this.$vuetify.theme.primary],

        xAxis: [{
          type: 'category',
          data: d.map(item => item.title),
          axisTick: {
            alignWithLabel: true
          }
        }],
        yAxis: [{
          type: 'value'
        }],

        series: [{
          type: 'line',
          showSymbol: true,
          step: "middle",
          data: d.map(item => item.value),
          areaStyle: {
            opacity: 0.25
          }
        }]
      }
    }



  },




  props: ["config"],

  watch: {},


  created() {
    this.loadFormList().then(res => this.formList = res)
  },

  mounted() { this.$emit("init") },

  data: () => ({
    formList: [],
    formConfig: null,
    formStat: null,
    moment,
    Date,
    chartOptions: {},
    i18n: {
      en: {
        "Last_update": "Last update:",
        "Application": "Application:",
        "Access_for": "Access for:",
        "Any_respondents": "Any respondents",
        "Logged_user": "Logged user",
        "Invited_respondents": "Invited respondents",
        "Opened": "was opened",
        "Closed": "was closed",
        "Question": "Question",
        "Required": "required",
        "Responses": "Responses",
        "Respondent_activity": "Respondent activity:",
        "Total": "Total",
        "Response_type": "Response type:",
        "One of many selection": "one of many selection",
        "Many of many selection": "many of many selection",
        "Rate": "rate",
        "Range": "range",
        "Date": "date",
        "Association": "association",
        "Influence": "influence",
        "Statistic": "Statistic",
        "Entities": "Entities:",
        "Factors": "Factors:",
        "Effects": "Effects:",
        "Scale": "Scale:",
        "Nominals": "Alternatives:",

        "Respondent_can_add_max": "Respondent can add max",
        "Self_variants": "self variants",
        "Respondents_collaboration_detected": "Respondents collaboration detected",
        "Respondent_shuld_select_between": "Respondent shuld select between",
        "And": "and",
        "Variants": "variants",
        "Range_between": "Range between",
        "By_step": "by step",
        "Priority": "priority"


      },
      uk: {
        "Last_update": "Останнє оновлення:",
        "Application": "Застосунок:",
        "Access_for": "Доступ для:",
        "Any_respondents": "будь-кого",
        "Logged_user": "зареєстрованих користувачів",
        "Invited_respondents": "запрошених респондентів",
        "Opened": "було відкрито",
        "Closed": "було закрито",
        "Question": "Запитання",
        "Required": "обов'язкове",
        "Responses": "відповідей",
        "Respondent_activity": "Активність респондентів:",
        "Total": "Загалом",
        "Response_type": "Тип відповіді:",
        "One of many selection": "вибір одного з багатьох варіантів",
        "Many of many selection": "вибір багатьох з багатьох варіантів",
        "Rate": "визначення рейтингу",
        "Range": "визначення діапазону",
        "Date": "визначення дати",
        "Association": "оцінювання зв'язків",
        "Influence": "оцінювання впливів",
        "Statistic": "Статистика",
        "Entities": "Сутності:",
        "Factors": "Фактори:",
        "Effects": "Ефекти:",
        "Scale": "Шкала:",
        "Nominals": "Варіанти:",
        "Respondent_can_add_max": "Респондент може додати максимум",
        "Self_variants": "власних варіантів",
        "Respondents_collaboration_detected": "Респонденти можуть взаємодіяти",
        "Respondent_shuld_select_between": "Респондент має обрати від",
        "And": "до",
        "Variants": "варіантів",
        "Range_between": "Діапазон від",
        "By_step": "з кроком",
        "Priority": "визначення пріоритетів"


      }
    }
  })

}

</script>
