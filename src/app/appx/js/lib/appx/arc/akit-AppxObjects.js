import { AKIT_ObjectARTypeFile } from '../../object/ar/type/akit-ObjectARTypeFile';
import { AKIT_ObjectARTypeVideo } from '../../object/ar/type/akit-ObjectARTypeVideo';
import { AKIT_ObjectARTypeObject } from '../../object/ar/type/akit-ObjectARTypeObject';

import { AKIT_ObjectARTypePlaneVideoEffectVignette } from '../../object/ar/type/akit-ObjectARTypePlaneVideoEffectVignette';

export default class AKIT_ARAppObjects {
  constructor(parent) {
    this.parent = parent;
    // this.lang = APP.language;
    this.loaderObjID = [];
    this.groupSelect = -1;
  }

  ////////////////////////////////////////////////////////////objects

  init() {
    this.objects = [];
    this.objectsData = [];
    this.objectsGroup = {};
    this.objectsGroupId = {};
    this.objectsLoaded = [];
  }

  log() {
    //console.log(this.objects);
    // console.log('log')
  }

  load(objectList) {
    // AKIT.promise.addList(objectList);

    let i = 0;
    for (let i = 0; i < objectList.length; i++) {
      let olist = objectList[i];
      let obj = this.objectLoad(olist);

      this.objectsLoaded.push(obj.id);

      //  console.log(this.objectsLoaded.length,obj.id)
    }
  }

  loadObj(olist) {
    let obj = this.objectLoad(olist);
    this.objectsLoaded.push(obj.id);
  }

  loadAnchor(olist) {
    let obj = this.objectLoad(olist);
    this.objectsLoaded.push(obj.id);
  }

  objectsLoad(id) {
    if (this.loaderObjID.indexOf(id) != -1) return false;

    this.loaderObjID.push(id);

    return true;
  }

  objectsLoadAgain(id) {
    let i = this.loaderObjID.indexOf(id);
    this.loaderObjID.remove(i);
  }

  objectLoadSet(obj) {
    var i = this.objectsLoaded.indexOf(obj.id);
    if (i != -1) {
      this.objectsLoaded.remove(i);
      obj.init();
      //   console.log('loaded',obj.id,JSON.stringify(this.objectsLoaded));
    }
  }

  objectLoad(olist) {
    let pdata = this.objectProfile(olist.filetype);

    let objUrl, obj, objFileName;

    if (pdata != undefined) {
      if (pdata.location == 'file')
        objUrl = this.objectFileURL(
          olist.name,
          olist.dir,
          olist.group,
          olist.filetype
        );

      objFileName = this.objectFileName(
        olist.name,
        olist.filetype,
        pdata.extension
      );

      obj = this.objectType(olist, pdata, objFileName, objUrl);

      this.objectProperties(obj, pdata);
    } else {
      objFileName = '';
      olist.filetype = '';
      obj = this.objectTypeObject(olist);
    }

    this.objects.push(obj);
    let objId = this.objects.length - 1;

    let mid = this.objectLoadGroupId(olist.marker); //this.parent.markerIds[olist.marker];

    this.objectGroupAdd(olist.group, mid, objId);

    let objData = this.objectData(olist);
    this.objectsData.push(objData);

    AKIT.alogAppA(
      '(object) ' +
        olist.name +
        ' ' +
        olist.group +
        ' ' +
        olist.filetype +
        ' filename:' +
        objFileName +
        '  marker:' +
        mid +
        ' ' +
        olist.marker +
        ' ' +
        objUrl
    );

    return obj;
  }

  objectLoadGroupId(omarker) {
    let gid = parseInt(omarker) - 1;

    if (this.parent.markerIds != undefined)
      gid = this.parent.markerIds[omarker];

    return gid;
  }

  objectProperties(obj, olist) {
    let oscale = olist.scale;
    let orot = olist.rotate;

    var data = { scale: oscale, rotate: orot };
    obj.settings(data);

    //

    let ll = olist.loader;
    obj.loaderSet(ll);

    let control = olist['control'];
    if (control != undefined) obj.control();
  }

  objectProfile(name) {
    const profileList = APP.properties;

    return profileList[name];
  }

  objectData(olist) {
    return this.parent.objectData(olist);
  }

  objectType(olist, plist, objFileName, objUrl) {
    let obj;
    let filetype = olist.filetype;
    if (filetype == 'videoNormal') {
      obj = new AKIT_ObjectARTypeVideo(
        olist.filetype,
        olist.name,
        objFileName,
        objUrl,
        plist.scale
      );
    } else if (filetype == 'video') {
      obj = this.objectPreloadVideo(objUrl, objFileName);
    } else if (filetype == 'obj' || filetype == 'gltf') {
      obj = new AKIT_ObjectARTypeFile(
        olist.filetype,
        olist.name,
        objFileName,
        objUrl,
        plist.scale
      );

      //obj.init(); // or promise
      //  obj.promise(); // or promise
    }

    return obj;
  }

  objectTypeObject(olist) {
    let obj = new AKIT_ObjectARTypeObject(olist.name, olist.object);

    return obj;
  }

  objectFileURL(name, dir, group, filetype) {
    return APP.host + APP.objDir + group + '/' + dir + '/'; //APP.host +
  }

  objectFileName(name, filetype, fileext) {
    if (filetype == 'video') {
      return name + '.' + fileext;
    }
    return name + '.' + filetype;
  }

  objectGroupAdd(grp, gid, idx) {
    let group = this.objectsGroup[grp];
    if (group == undefined) group = [];
    group.push(idx);

    this.objectsGroup[grp] = group;

    //
    let groupid = this.objectsGroupId[gid];
    if (groupid == undefined) this.objectsGroupId[gid] = grp;

    //console.log(grp, gid, idx);

    // console.log(this.objectsGroup,this.objectsGroupId);
  }

  objectGet(groupId, groupCode) {
    if (groupId != this.groupSelect) {
      if (!this.objectGroupSet(groupId)) {
        window.APP.run.parent.objects(groupId, groupCode);
        //  console.log('objects' );
        return false;
      }
      this.groupSelect = groupId;
    }

    let oid = this.objectsGroupSelect[this.objectSelect];

    let obj = this.objects[oid];

    this.objectLoadSet(obj);

    return obj;
  }

  objectPromise(p) {
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

  /////////////////////////////////////////////////////////
  objectIndexSet(index) {
    //console.log(index,this.objectsGroupSelect);

    if (index < this.objectsGroupSelect.length) {
      this.objectSelect = index;
    }
  }

  objectIndexGet() {
    return this.objectSelect;
  }

  objectIndexFade() {
    let obj = this.objects[this.objectSelect];
  }

  // 0 0.8801993743028066 false -1 0

  objectGroupSet(markerId) {
    this.objectSelect = 0;
    let grp = this.objectsGroupId[markerId];

    console.log(grp, markerId, this.objectsGroupId);

    if (grp != undefined) {
      this.objectsGroupSelect = this.objectsGroup[grp];
      this.objectGroupDataSet();
      return true;
    }

    return false;
  }

  objectGroupDataSet() {
    this.objectsGroupSelectData = [];
    for (let i = 0; i < this.objectsGroupSelect.length; i++) {
      let oid = this.objectsGroupSelect[i];

      let odata = this.objectsData[oid];
      this.objectsGroupSelectData.push(odata);
    }

    //console.log(APP.run.parent);
    APP.run.parent.call('objectGroup', this.objectsGroupSelectData);
    // console.log('datagrp', this.objectsGroupSelectData);
  }

  objectGroupData() {
    if (this.objectsGroupSelect != -1) {
      return this.objectsGroupSelectData;
    }
  }

  objectPreloadVideo(objUrl, objFileName) {
    let obj;

    var planeX = APP.video.width;
    var planeY = APP.video.height;
    var imageWidth = APP.video.imageWidth;
    var imageHeight = APP.video.imageHeight;

    var hostName = objUrl;
    var videoSrc = objUrl + objFileName;
    var debug = false;

    obj = AKIT.store.get('ARTypePlaneVideoEffectVignette');

    if (obj == undefined) {
      obj = new AKIT_ObjectARTypePlaneVideoEffectVignette(
        planeX,
        planeY,
        imageWidth,
        imageHeight,
        hostName,
        videoSrc,
        debug
      );
    } else {
      obj.reconstruct(
        planeX,
        planeY,
        imageWidth,
        imageHeight,
        hostName,
        videoSrc,
        debug
      );
    }

    return obj;
  }
}

/* objectOptions(obj,olist) {
  let sc = olist.scale;
  if (sc!=undefined ) {
   // obj.updateScale(sc)
  }
}*/

/* let obj;
if (olist.filetype == 'video') {
  obj = new AKIT_ObjectARTypeVideo(olist.filetype, olist.name, objFileName, objUrl, olist.scale);
} else obj = new AKIT_ObjectARTypeFile(olist.filetype, olist.name, objFileName, objUrl, olist.scale);*/

/*


  objectInit1(obj, olist) {

    let oscale = olist.scale;
    console.log(obj)
    obj.updateScale(oscale);

    let orot = olist.rotate;
    if (orot != undefined) {
      obj.rotationXYZ(orot.x * Math.PI, orot.y * Math.PI, orot.z * Math.PI);
    }

    obj.meshObjectUpdateAll();
  }
 */
/////////
// if (this.markerIds != undefined) {
//   let mid = this.markerIds[olist.marker];

//   if (this.markerMgr.objects[mid] == undefined) this.markerMgr.objects[mid] = [];
//   this.markerMgr.objects[mid].push(objId);

// this.item.meshObjectUpdateAll();

//console.log(this.markerMgr.objects[mid], mid);

/*loadAll(objectList) {
    //const objectList = APP.objects;

    AKIT.promise.start('objectar');
    let i = 0;
    for (let i = 0; i < objectList.length; i++) {
      let olist = objectList[i];
      this.objectLoad(olist);
    }

    AKIT.promise.set('objectar');

    //console.log(this.objectsData,this.objectsGroup,this.objectsGroupId);
  }*/
