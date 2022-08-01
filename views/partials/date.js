var app = new Vue({
    el: '#app',
    data: {
      value: '02/02/1988'
    }
  })
  
  //var regex = /(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d/
  //var regex = /^(0[1-9]|[12][0-9]|3[01])|(0[1-9]|1[012])/
  var regex = /^(0[1-9]|1[012]|[1-12])(|\/|\.)(0[1-9]|[12][0-9]|3[01]|[1-9])(|\/|\.)(((19|20)\d\d)|(\d\d)$)/gm
  
  function ExtractDate(date){
    if (typeof(date)==="object") return date;
    var a = regex.exec(date);
    if (!a) return;
           
    var mm = +a[1], dd = +a[3], yy = +a[5];
    mm = mm < 10 ? "0" + mm : mm; 
    dd = dd < 10 ? "0" + dd : dd;
    yy = yy.toString().length === 4 ? yy : 30 < yy && yy < 100 ? 1900+yy : 2000+yy
  
    
    return {
      mm: mm,
      dd: dd,
      yy: yy,
      date: new Date(+yy, (+mm - 1), (+dd) )
    };
  }
    
  $(".datepicker").datepicker({
    format: {
      /*
       * Say our UI should display a week ahead,
       * but textbox should store the actual date.
       * This is useful if we need UI to select local dates,
       * but store in UTC
       */
      toDisplay: function(date, format, language) {
        console.log('>' , date )
        if (typeof(date)==="object") {
          var mm = date.getMonth() + 1, dd =  date.getDate(), yy = date.getFullYear();
          mm = mm < 10 ? "0" + mm : mm; 
          dd = dd < 10 ? "0" + dd : dd;        
        } 
        console.log('>>', date, mm, dd, yy)
        return [mm, dd, yy].join("/");
        /*return date;
        var d = ExtractDate(date);
        console.log("toDisplay:", date, d, typeof(date));
        if (!d) return
        var result = [d.dd, d.mm, d.yy].join("\\")
        console.log("toDisplay:", d, result);
        return result; */
      },
      toValue: function(date, format, language) {
        console.log('+', date)
        var d = ExtractDate(date)
        if (!d) return
        console.log("toValue:", d );
        return d.date;
      }
    }
  });
  