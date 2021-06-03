// ##############################
// // // javascript library for creating charts
// // // get data from random data from api import
// #############################
var Chartist = require('chartist');
const math = require('mathjs');

// ##############################
// // // variables used to create animation on charts
// #############################
var delays = 80,
  durations = 500;
var delays2 = 80,
  durations2 = 500;

// ##############################
// // // Daily Sales
// #############################

const setDailySalesChartFunc = (data) => {
  const maxInData = math.max(data);
  const minInData = math.min(data);

  const dailySalesChart = {
    data: {
      labels: ['M', 'T', 'W', 'T', 'F', 'S'],
      series: [data],
    },
    options: {
      lineSmooth: Chartist.Interpolation.cardinal({
        tension: 0,
      }),
      low: minInData - 10,
      high: maxInData + 10, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
      chartPadding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      },
    },
    // for animation
    animation: {
      draw: function(data) {
        if (data.type === 'line' || data.type === 'area') {
          data.element.animate({
            d: {
              begin: 600,
              dur: 700,
              from: data.path
                .clone()
                .scale(1, 0)
                .translate(0, data.chartRect.height())
                .stringify(),
              to: data.path.clone().stringify(),
              easing: Chartist.Svg.Easing.easeOutQuint,
            },
          });
        } else if (data.type === 'point') {
          data.element.animate({
            opacity: {
              begin: (data.index + 1) * delays,
              dur: durations,
              from: 0,
              to: 1,
              easing: 'ease',
            },
          });
        }
      },
    },
  };

  return dailySalesChart;
};

// ##############################
// // // Email Subscriptions
// #############################
const setEmailsSubscriptionChartFunc = (data) => {
  const maxInData = math.max(data);

  const emailsSubscriptionChart = {
    data: {
      labels: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'Mai',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ],
      series: [data],
    },
    options: {
      axisX: {
        showGrid: false,
      },
      low: 0,
      high: maxInData + 5,
      chartPadding: {
        top: 0,
        right: 10,
        bottom: 0,
        left: 0,
      },
    },
    responsiveOptions: [
      [
        'screen and (max-width: 640px)',
        {
          seriesBarDistance: 5,
          axisX: {
            labelInterpolationFnc: function(value) {
              return value[0];
            },
          },
        },
      ],
    ],
    animation: {
      draw: function(data) {
        if (data.type === 'bar') {
          data.element.animate({
            opacity: {
              begin: (data.index + 1) * delays2,
              dur: durations2,
              from: 0,
              to: 1,
              easing: 'ease',
            },
          });
        }
      },
    },
  };

  return emailsSubscriptionChart;
};

// ##############################
// // // Completed Tasks
// #############################

const setCompletedTasksChartFunc = (data) => {
  const maxInData = math.max(data);
  const minInData = math.min(data);

  const completedTasksChart = {
    data: {
      labels: ['12am', '3pm', '6pm', '9pm', '12pm', '3am', '6am', '9am'],
      series: [data],
    },
    options: {
      lineSmooth: Chartist.Interpolation.cardinal({
        tension: 0,
      }),
      low: minInData - 5,
      high: maxInData + 5, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
      chartPadding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      },
    },
    animation: {
      draw: function(data) {
        if (data.type === 'line' || data.type === 'area') {
          data.element.animate({
            d: {
              begin: 600,
              dur: 700,
              from: data.path
                .clone()
                .scale(1, 0)
                .translate(0, data.chartRect.height())
                .stringify(),
              to: data.path.clone().stringify(),
              easing: Chartist.Svg.Easing.easeOutQuint,
            },
          });
        } else if (data.type === 'point') {
          data.element.animate({
            opacity: {
              begin: (data.index + 1) * delays,
              dur: durations,
              from: 0,
              to: 1,
              easing: 'ease',
            },
          });
        }
      },
    },
  };
  return completedTasksChart;
};

module.exports = {
  setDailySalesChartFunc,
  setEmailsSubscriptionChartFunc,
  setCompletedTasksChartFunc,
};
