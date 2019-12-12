export default class APPX_AppPromise {
  constructor() {
    this.plist = {};
    this.count = 0;
    this.total = 0;
  }

  addList(objectList) {
    let i = 0;
    for (let i = 0; i < objectList.length; i++) {
      let olist = objectList[i];
      this.plist[olist.name] = olist;

      console.log('promise (list)' + olist.name);
    }
  }

  load(name) {
    let loadObj = this.plist[name];
    // this.plist[olist.name]=undefined;

    return loadObj;
  }

  promise(p) {
    let _me = this;
    let pl = [];

    p.then(function(val) {
      //  _me.progress(++_me.count);
      return val;
    });

    pl.push(p);

    Promise.all(pl).then(values => {
      console.log(values);
    });
  }
}

/*
  addLoadingList(name) {
  if (this.videoLoadList[name] == undefined) {
    //   console.log('loadlist', name);
    this.videoLoadList.push(name);
    this.videoList[name].setVideoLoad(name);
  }
}
 */

/*start(name) {
    this.plist = [];
    this.count = 0;
    this.total = 0;

    console.log('promise (start)' + name)
  }

  add(name, p) {
    let _me = this;

    p.then(function(val) {
      _me.progress(++_me.count);
      return val;
    });

    console.log('promise (add)' + name)

    this.plist.push(p);
  }

  set() {
    console.log('promise (set)' + name + " " + this.plist.length)

    Promise.all(this.plist).then(values => {
       console.log(values);
    });
  }

  progress(count) {
    this.total = count / this.plist.length;
  }*/
/*


      Promise.progress = async function progress (iterable, onprogress) {
        await this.resolve()

        const promises = Array
          .from(iterable)
          .map(this.resolve)
        const { length } = promises
        let resolved = 0
        const values = promises.map(async promise => {
          const value = await promise
          const event = new ProgressEvent('progress', {
            total: length,
            loaded: ++resolved
          })

          onprogress(event)

          return value
        })
        const event = new ProgressEvent('progress', {
          total: length,
          loaded: resolved
        })

        onprogress(event)

        console.log(event)
        return this.all(values)
      }



function progressPromise(promises, tickCallback) {
  var len = promises.length;
  var progress = 0;

  function tick(promise) {
    promise.then(function () {
      progress++;
      tickCallback(progress, len);
    });
    return promise;
  }

  return Promise.all(promises.map(tick));
}

// generate a promise that resolves after up to 2 seconds.
function wait() {
  return new Promise(function (done) {
    setTimeout(done, Math.random() * 2000);
  });
}


var progressEl = document.querySelector('progress');
var valueEl = document.querySelector('span');

function update(completed, total) {
  progressEl.value = Math.round(completed / total * 100);
  valueEl.innerHTML = completed + '/' + total;
}

document.querySelector('button').addEventListener('click', function (e) {
  var tasks = Array(100).fill(0).map(wait);
  progressPromise(tasks, update).then(function (results) {
    console.log('done!');
  });
})*/
