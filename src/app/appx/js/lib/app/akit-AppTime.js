function systemTimeout() {
  if (electron != undefined) {
    aloggerKit(' (event timeout) ');
    eapp.quit();
  }

  aloggerKit(' (event timeout) ');
}
