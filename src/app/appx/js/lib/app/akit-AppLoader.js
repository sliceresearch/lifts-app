import APPX_ObjectTypeSphereDebug from '../object/type/appx-ObjectTypeSphereDebug';
import APPX_ObjectLoaderTypeSpinner from '../object/loader/type/appx-ObjectLoaderTypeSpinner';

export default class APPX_AppLoader {
  constructor() {
    this.loaders = {};
    this.loadersArgs = {};
  }

  add(name, args) {
    //APPX_ObjectARTypeCubeLoader
    let l;
    let readyNow = false;

    if (name == 'test') {
      let s = args.size;
      l = new APPX_ObjectTypeSphereDebug(s, s, s);
      readyNow = true;
    }
    if (name == 'spinner') {
      let s = args.size;
      l = new APPX_ObjectLoaderTypeSpinner(
        'assets/img/spinner.png',
        s,
        s,
        args.len,
        args.len,
        false
      );
    }

    l.init();

    this.loaders[name] = l;
    this.loadersArgs[name] = args;
    if (readyNow) this.ready(name);
  }

  ready(name) {
    let l = this.loaders[name];
    let args = this.loadersArgs[name];
    this.argumentsSet(l, args);
    APPX.alogKit('(loader-add): ' + name + ' ' + args);
  }

  show(name) {
    let l = this.loaders[name];
    l.add();
    l.show();
    //  console.log('show loader');
  }

  hide(name) {
    let l = this.loaders[name];
    l.hide();
    l.remove();
    // console.log('hide loader');
  }

  update(name) {
    this.loaders[name].update();
  }

  argumentsSet(lobj, args) {
    // let oscale = args.scale;
    //this.updateScale(oscale);

    let orot = args['rotate'];
    if (orot != undefined) {
      lobj.rotationXYZ(orot.x * Math.PI, orot.y * Math.PI, orot.z * Math.PI);
      //    console.log(lobj,orot)
    }
  }
}
