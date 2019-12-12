function findClosest(xv, yv, angs) {
  let ang = 999;
  let cidx;

  //var _me=this;

  const tang = getAngleDeg(xv, yv);
  const aseg = Math.round(angs.length / 8);

  const i1 = 0;
  const i2 = aseg * 2;
  const i3 = aseg * 4;
  const i4 = aseg * 6;
  let i5;

  var c1;
  var c2;
  let c3;
  let x1, x2, x3;

  const q1 = Math.abs(angs[i1] - tang);
  const q2 = Math.abs(angs[i2] - tang);
  const q3 = Math.abs(angs[i3] - tang);
  const q4 = Math.abs(angs[i4] - tang);

  let quadrant;
  var c1, c2;
  if (q1 < q3) {
    c1 = q1;
    x1 = i1;
    if (q2 < q4) {
      quadrant = 1;
      c2 = q2;
      x2 = i2;
    } else {
      quadrant = 4;
      c2 = q4;
      x2 = i4;
    }
  } else {
    c1 = q3;
    x1 = i3;
    if (q2 < q4) {
      quadrant = 2;
      c2 = q2;
      x2 = i2;
    } else {
      quadrant = 3;
      c2 = q4;
      x2 = i4;
    }
  }

  if (quadrant == 1) i5 = aseg;
  else if (quadrant == 2) i5 = aseg * 3;
  else if (quadrant == 3) i5 = aseg * 5;
  else if (quadrant == 4) i5 = aseg * 7;

  const r2 = i5; //Math.abs(angs[i5]-tang);
  let r1;

  if (c1 < c2) {
    cc1 = c1;
    r1 = x1;
  } else {
    cc1 = c2;
    r1 = x2;
  }

  let ii1, ii2;

  if (r1 < r2) {
    ii1 = r1;
    ii2 = r2;
  } else {
    ii1 = r2;
    ii2 = r1;
  }

  let c = ii1;
  cidx = ii1;
  for (let i = ii1; i < ii2; i++) {
    const adist = Math.abs(angs[i] - tang);

    if (adist < ang) {
      ang = adist;
      cidx = c;
    }

    c++;
  }

  alogApp('anode: (findClosest):' + cidx + ' ' + ii1 + ' ' + ii2 + ' ' + tang);

  return cidx;
}

////////////////////////////////////////////////////////////////////////////////////// tweening

function getDirectionAxis(dir, odir, velocity) {
  let vel1 = velocity / 100; //this.velocityMax;

  alogApp('getDirectionAxis:' + velocity + ' ' + vel1);

  if (vel1 > 1) vel1 = 1;

  vel1 = vel1 * -1;

  const odir1 = odir; //new THREE.Vector3( odir.x, odir.y, odir.z );
  const dir1 = dir; //new THREE.Vector3( dir.x, dir.y, dir.z );

  const radians = odir1.angleTo(dir1) * vel1;
  const axis = dir1.cross(odir1);
  axis.normalize();

  const matrix = new THREE.Matrix4().makeRotationAxis(axis, radians);
  odir1.applyMatrix4(matrix);

  return odir1;
}
