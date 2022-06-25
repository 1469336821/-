if(!self.__appxInited) {
self.__appxInited = 1;
require('@alipay/appx-compiler/lib/sjsEnvInit');

require('./config$');


      if( navigator.userAgent && (navigator.userAgent.indexOf('LyraVM') > 0 || navigator.userAgent.indexOf('AlipayIDE') > 0) ) {
        var AFAppX = self.AFAppX.getAppContext ? self.AFAppX.getAppContext().AFAppX : self.AFAppX;
      } else {
        importScripts('https://appx/af-appx.worker.min.js');
        var AFAppX = self.AFAppX;
      }
      self.getCurrentPages = AFAppX.getCurrentPages;
      self.getApp = AFAppX.getApp;
      self.Page = AFAppX.Page;
      self.App = AFAppX.App;
      self.my = AFAppX.bridge || AFAppX.abridge;
      self.abridge = self.my;
      self.Component = AFAppX.WorkerComponent || function(){};
      self.$global = AFAppX.$global;
      self.requirePlugin = AFAppX.requirePlugin;
    

if(AFAppX.registerApp) {
  AFAppX.registerApp({
    appJSON: appXAppJson,
  });
}

if(AFAppX.compilerConfig){ AFAppX.compilerConfig.component2 = true; }

function success() {
require('../../app');
require('../../uni_modules/uni-row/components/uni-row/uni-row?hash=ec7c5687c7f2ffa836caf3a93e877914426baff6');
require('../../uni_modules/uni-row/components/uni-col/uni-col?hash=ec7c5687c7f2ffa836caf3a93e877914426baff6');
require('../../uni_modules/uni-icons/components/uni-icons/uni-icons?hash=ec7c5687c7f2ffa836caf3a93e877914426baff6');
require('../../uni_modules/uni-dateformat/components/uni-dateformat/uni-dateformat?hash=591ac642b6f57a184fac9330fa292ccf33c32471');
require('../../components/fillpage?hash=c606d3a258cac2da7f13b4a43b9fc386a9b61269');
require('../../uni_modules/uni-datetime-picker/components/uni-datetime-picker/calendar-item?hash=ec7c5687c7f2ffa836caf3a93e877914426baff6');
require('../../uni_modules/uni-datetime-picker/components/uni-datetime-picker/time-picker?hash=ec7c5687c7f2ffa836caf3a93e877914426baff6');
require('../../uni_modules/uni-datetime-picker/components/uni-datetime-picker/calendar?hash=d29184102f8d31f8438ee8ec42ffe57db7b98adc');
require('../../uni_modules/uni-datetime-picker/components/uni-datetime-picker/uni-datetime-picker?hash=c4c17770910b938e53c0ea3285d3ee9bf90e1afd');
require('../../pages/index/index?hash=1d11791ffce031696d8ee4ce97c954a378091deb');
require('../../pages/fill/fill?hash=90d4e92b68ade3734e27f0d512ace35f8fb78574');
require('../../pages/history/history?hash=dbee0829437b1e463c7ae6ddd0137428bcb1bff0');
require('../../pages/details/details?hash=22d3dad5e1a3350994880d4c8560db0725c77f57');
require('../../pages/historydetails/historydetails?hash=4ce39b73496bb289df79d0f7ab17ac73ce0e09ea');
require('../../pages/showdetails/showdetails?hash=4ce39b73496bb289df79d0f7ab17ac73ce0e09ea');
}
self.bootstrapApp ? self.bootstrapApp({ success }) : success();
}