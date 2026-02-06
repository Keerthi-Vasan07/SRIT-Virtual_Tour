/*
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

(function() {
  var Marzipano = window.Marzipano;
  var bowser = window.bowser;
  var screenfull = window.screenfull;
  var data = window.APP_DATA;

  // Grab elements from DOM.
  var panoElement = document.querySelector('#pano');
  var sceneNameElement = document.querySelector('#titleBar .sceneName');
  var sceneListElement = document.querySelector('#sceneList');
  var sceneElements = document.querySelectorAll('#sceneList .scene');
  var sceneListToggleElement = document.querySelector('#sceneListToggle');
  var autorotateToggleElement = document.querySelector('#autorotateToggle');
  var fullscreenToggleElement = document.querySelector('#fullscreenToggle');

  // Detect desktop or mobile mode.
  if (window.matchMedia) {
    var setMode = function() {
      if (mql.matches) {
        document.body.classList.remove('desktop');
        document.body.classList.add('mobile');
      } else {
        document.body.classList.remove('mobile');
        document.body.classList.add('desktop');
      }
    };
    var mql = matchMedia("(max-width: 500px), (max-height: 500px)");
    setMode();
    mql.addListener(setMode);
  } else {
    document.body.classList.add('desktop');
  }

  // Detect whether we are on a touch device.
  document.body.classList.add('no-touch');
  window.addEventListener('touchstart', function() {
    document.body.classList.remove('no-touch');
    document.body.classList.add('touch');
  });

  // Use tooltip fallback mode on IE < 11.
  if (bowser.msie && parseFloat(bowser.version) < 11) {
    document.body.classList.add('tooltip-fallback');
  }

  // Viewer options.
  var viewerOpts = {
    controls: {
      mouseViewMode: data.settings.mouseViewMode
    }
  };

  // Initialize viewer.
  var viewer = new Marzipano.Viewer(panoElement, viewerOpts);

  var playerDot = document.getElementById("playerDot");

/* Map positions per scene id (X%, Y%) */
var mapPositions = {
  "59-2-2": { x: 100, y: 8 },
  "58-3":   { x: 100, y: 8 },
  "100-283":        { x: 100, y: 12 },
  "46-306":      { x: 80, y: 12 },
  "45-308":      { x: 77, y: 12 },
  "44-310":      { x: 75, y: 12 },
  "43-312":      { x: 70, y: 12 },
  "42-314":      { x: 65, y: 10 },
  "41-316":      { x: 62, y: 10 },
  "40-318":      { x: 60, y: 10 },
  "39-320":      { x: 59, y: 10 },
  "38-322":      { x: 57, y: 10},
  "37-324":      { x: 55, y:10 },
  "36-326":      { x: 52, y: 10 },
  "35-328":      { x: 50, y: 8 },
  "34-330":      { x: 49, y: 8 },
  "33-332":      { x: 47, y: 8 },
  "28-342":      { x: 45, y: 8 },
  "27-344":      { x: 42, y: 8 },
  "26-346":      { x: 40, y: 8 },
  "25-348":      { x: 38, y: 8 },
  "24-350":      { x: 35, y: 8 },
  "23-352":      { x: 32, y: 8 },
  "22-354":      { x: 30, y: 8 },
  "21-356":      { x: 28, y: 7 },
  "20-358":      { x: 25, y: 7 },
  "19-360":      { x: 22, y: 7 },
  "18-362":      { x: 20, y: 7 },
  "17-364":      { x: 18, y: 7 },
  "16-366":      { x: 15, y: 7 },
  "15-368":      { x: 12, y: 7 },
  "14-370":      { x: 10, y: 7 },
  "13-372":      { x: 9, y: 7 },
  "12-374":      { x: 7, y: 7 },
  "11-376":      { x: 5, y: 7 },
  "10-378":      { x: 2, y: 7 },
  "9-380":       { x: 0, y: 7 },
  "8-382":       { x: 0, y: 7 },
  "7-384":       { x: 0, y: 7 },
  "6-386":       { x: 0, y: 7 },
  "5-388":       { x: 0, y: 7 },
  "4-390":       { x: 0, y: 7 },
  "3-392":       { x: 0, y: 7 },
  "2-394":       { x: 0, y: 7 },
  "1-396":       { x: 0, y: 7 },

  "91-408":       { x: 45, y: 13 },
  "92-410":       { x: 45, y: 15 },
  "93-412":       { x: 45, y: 16 },
  "94-414":       { x: 45, y: 18 },
  "95-416":       { x: 45, y: 19 },
  "96-418":       { x: 45, y: 20 },
  "97-420":       { x: 45, y: 23 },
  "98-422":       { x: 45, y: 25 },
  "99-424":       { x: 45, y: 27 },
  "77-484-1jpg":    { x: 45, y: 40 },
  "76-482jpg":    { x: 35, y: 100 },
  "78-486jpg":    { x: 40, y: 40},
  "79-488jpg":    { x: 45, y: 40 },
  "80-490jpg":    { x: 50, y: 40 },
  "81-492jpg":    { x: 55, y: 35 },
  "82-494jpg":    { x: 60, y: 30 },
  "83-496jpg":    { x: 65, y: 30 },
  "84-498jpg":    { x: 70, y: 30 },
  "85-500jpg":    { x: 75, y: 30 },
  "57-4":         { x: 100, y: 20 },
  "56-285":       { x: 100, y: 25 },
  "55-286":       { x: 100, y: 27 },
  "54-288":       { x: 100, y: 30 },
  "53-290":       { x: 100, y: 35 },
  "52-292":       { x: 100, y: 40 },
  "51-294":       { x: 90, y: 40 },
  "50-296":       { x: 80, y: 40 },
  "49-298":       { x: 70, y: 40 },
  "48-300":       { x: 65, y: 40 },
  "101-189":      { x: 72, y: 35 },
  "111-213jpg":      { x: 80, y: 30 },
  "110-211jpg":      { x: 80, y: 27 },
  "109-209jpg":      { x: 77, y: 25 },
  "108-208jpg":      { x: 75, y: 25 },
  "103-198":      { x: 73, y: 20 },
  "102-196":      { x: 73, y: 17 },
  "104-199jpg":      { x: 70, y: 20 },
  "105-202jpg":      { x: 70, y: 20 },
  "106-203jpg":      { x: 67, y: 22 },
  "107-205jpg":      { x: 65, y: 26 },

};

  // Create scenes.
  var scenes = data.scenes.map(function(data) {
    var urlPrefix = "tiles";
    var source = Marzipano.ImageUrlSource.fromString(
      urlPrefix + "/" + data.id + "/{z}/{f}/{y}/{x}.jpg",
      { cubeMapPreviewUrl: urlPrefix + "/" + data.id + "/preview.jpg" });
    var geometry = new Marzipano.CubeGeometry(data.levels);

    var limiter = Marzipano.RectilinearView.limit.traditional(data.faceSize, 100*Math.PI/180, 120*Math.PI/180);
    var view = new Marzipano.RectilinearView(data.initialViewParameters, limiter);

    var scene = viewer.createScene({
      source: source,
      geometry: geometry,
      view: view,
      pinFirstLevel: true
    });

    // Create link hotspots.
    data.linkHotspots.forEach(function(hotspot) {
      var element = createLinkHotspotElement(hotspot);
      scene.hotspotContainer().createHotspot(element, { yaw: hotspot.yaw, pitch: hotspot.pitch });
    });

    // Create info hotspots.
    data.infoHotspots.forEach(function(hotspot) {
      var element = createInfoHotspotElement(hotspot);
      scene.hotspotContainer().createHotspot(element, { yaw: hotspot.yaw, pitch: hotspot.pitch });
    });

    return {
      data: data,
      scene: scene,
      view: view
    };
  });

  // Set up autorotate, if enabled.
  var autorotate = Marzipano.autorotate({
    yawSpeed: 0.03,
    targetPitch: 0,
    targetFov: Math.PI/2
  });
  if (data.settings.autorotateEnabled) {
    autorotateToggleElement.classList.add('enabled');
  }

  // Set handler for autorotate toggle.
  autorotateToggleElement.addEventListener('click', toggleAutorotate);

  // Set up fullscreen mode, if supported.
  if (screenfull.enabled && data.settings.fullscreenButton) {
    document.body.classList.add('fullscreen-enabled');
    fullscreenToggleElement.addEventListener('click', function() {
      screenfull.toggle();
    });
    screenfull.on('change', function() {
      if (screenfull.isFullscreen) {
        fullscreenToggleElement.classList.add('enabled');
      } else {
        fullscreenToggleElement.classList.remove('enabled');
      }
    });
  } else {
    document.body.classList.add('fullscreen-disabled');
  }

  // Set handler for scene list toggle.
  sceneListToggleElement.addEventListener('click', toggleSceneList);

  // Start with the scene list open on desktop.
  if (!document.body.classList.contains('mobile')) {
    showSceneList();
  }

  // Set handler for scene switch.
  scenes.forEach(function(scene) {
    var el = document.querySelector('#sceneList .scene[data-id="' + scene.data.id + '"]');
    el.addEventListener('click', function() {
      switchScene(scene);
      // On mobile, hide scene list after selecting a scene.
      if (document.body.classList.contains('mobile')) {
        hideSceneList();
      }
    });
  });

  // DOM elements for view controls.
  var viewUpElement = document.querySelector('#viewUp');
  var viewDownElement = document.querySelector('#viewDown');
  var viewLeftElement = document.querySelector('#viewLeft');
  var viewRightElement = document.querySelector('#viewRight');
  var viewInElement = document.querySelector('#viewIn');
  var viewOutElement = document.querySelector('#viewOut');

  // Dynamic parameters for controls.
  var velocity = 0.7;
  var friction = 3;

  // Associate view controls with elements.
  var controls = viewer.controls();
  controls.registerMethod('upElement',    new Marzipano.ElementPressControlMethod(viewUpElement,     'y', -velocity, friction), true);
  controls.registerMethod('downElement',  new Marzipano.ElementPressControlMethod(viewDownElement,   'y',  velocity, friction), true);
  controls.registerMethod('leftElement',  new Marzipano.ElementPressControlMethod(viewLeftElement,   'x', -velocity, friction), true);
  controls.registerMethod('rightElement', new Marzipano.ElementPressControlMethod(viewRightElement,  'x',  velocity, friction), true);
  controls.registerMethod('inElement',    new Marzipano.ElementPressControlMethod(viewInElement,  'zoom', -velocity, friction), true);
  controls.registerMethod('outElement',   new Marzipano.ElementPressControlMethod(viewOutElement, 'zoom',  velocity, friction), true);

  function sanitize(s) {
    return s.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;');
  }

  function switchScene(scene, viewParams) {
  stopAutorotate();

  if (viewParams) {
    scene.view.setParameters(viewParams);
  }

  scene.scene.switchTo();
  startAutorotate();
  updateSceneName(scene);
  updateSceneList(scene);

  var pos = mapPositions[scene.data.id];
if (pos) {
  playerDot.style.left = pos.x + "%";
  playerDot.style.top  = pos.y + "%";
}

}


  function updateSceneName(scene) {
    sceneNameElement.innerHTML = sanitize(scene.data.name);
  }

  function updateSceneList(scene) {
    for (var i = 0; i < sceneElements.length; i++) {
      var el = sceneElements[i];
      if (el.getAttribute('data-id') === scene.data.id) {
        el.classList.add('current');
      } else {
        el.classList.remove('current');
      }
    }
  }

  function showSceneList() {
    sceneListElement.classList.add('enabled');
    sceneListToggleElement.classList.add('enabled');
  }

  function hideSceneList() {
    sceneListElement.classList.remove('enabled');
    sceneListToggleElement.classList.remove('enabled');
  }

  function toggleSceneList() {
    sceneListElement.classList.toggle('enabled');
    sceneListToggleElement.classList.toggle('enabled');
  }

  function startAutorotate() {
    if (!autorotateToggleElement.classList.contains('enabled')) {
      return;
    }
    viewer.startMovement(autorotate);
    viewer.setIdleMovement(3000, autorotate);
  }

  function stopAutorotate() {
    viewer.stopMovement();
    viewer.setIdleMovement(Infinity);
  }

  function toggleAutorotate() {
    if (autorotateToggleElement.classList.contains('enabled')) {
      autorotateToggleElement.classList.remove('enabled');
      stopAutorotate();
    } else {
      autorotateToggleElement.classList.add('enabled');
      startAutorotate();
    }
  }

  function createLinkHotspotElement(hotspot) {

    // Create wrapper element to hold icon and tooltip.
    var wrapper = document.createElement('div');
    wrapper.classList.add('hotspot');
    wrapper.classList.add('link-hotspot');

    // Create image element.
    var icon = document.createElement('img');
    icon.src = 'img/arrow.png';
    icon.classList.add('link-hotspot-icon');

    // Set rotation transform.
    var transformProperties = [ '-ms-transform', '-webkit-transform', 'transform' ];
    for (var i = 0; i < transformProperties.length; i++) {
      var property = transformProperties[i];
      icon.style[property] = 'rotate(' + hotspot.rotation + 'rad)';
    }

    // Add click event handler.
    wrapper.addEventListener('click', function() {

  var currentYaw = viewer.view().yaw();
  var currentPitch = viewer.view().pitch();
  var currentFov = viewer.view().fov();

  switchScene(
    findSceneById(hotspot.target),
    {
      yaw: currentYaw,
      pitch: currentPitch,
      fov: currentFov
    }
  );

});


    // Prevent touch and scroll events from reaching the parent element.
    // This prevents the view control logic from interfering with the hotspot.
    stopTouchAndScrollEventPropagation(wrapper);

    // Create tooltip element.
    var tooltip = document.createElement('div');
    tooltip.classList.add('hotspot-tooltip');
    tooltip.classList.add('link-hotspot-tooltip');
    tooltip.innerHTML = findSceneDataById(hotspot.target).name;

    wrapper.appendChild(icon);
    wrapper.appendChild(tooltip);

    return wrapper;
  }

  function createInfoHotspotElement(hotspot) {

    // Create wrapper element to hold icon and tooltip.
    var wrapper = document.createElement('div');
    wrapper.classList.add('hotspot');
    wrapper.classList.add('info-hotspot');

    // Create hotspot/tooltip header.
    var header = document.createElement('div');
    header.classList.add('info-hotspot-header');

    // Create image element.
    var iconWrapper = document.createElement('div');
    iconWrapper.classList.add('info-hotspot-icon-wrapper');
    var icon = document.createElement('img');
    icon.src = 'img/info.png';
    icon.classList.add('info-hotspot-icon');
    iconWrapper.appendChild(icon);

    // Create title element.
    var titleWrapper = document.createElement('div');
    titleWrapper.classList.add('info-hotspot-title-wrapper');
    var title = document.createElement('div');
    title.classList.add('info-hotspot-title');
    title.innerHTML = hotspot.title;
    titleWrapper.appendChild(title);

    // Create close element.
    var closeWrapper = document.createElement('div');
    closeWrapper.classList.add('info-hotspot-close-wrapper');
    var closeIcon = document.createElement('img');
    closeIcon.src = 'img/close.png';
    closeIcon.classList.add('info-hotspot-close-icon');
    closeWrapper.appendChild(closeIcon);

    // Construct header element.
    header.appendChild(iconWrapper);
    header.appendChild(titleWrapper);
    header.appendChild(closeWrapper);

    // Create text element.
    var text = document.createElement('div');
    text.classList.add('info-hotspot-text');
    text.innerHTML = hotspot.text;

    // Place header and text into wrapper element.
    wrapper.appendChild(header);
    wrapper.appendChild(text);

    // Create a modal for the hotspot content to appear on mobile mode.
    var modal = document.createElement('div');
    modal.innerHTML = wrapper.innerHTML;
    modal.classList.add('info-hotspot-modal');
    document.body.appendChild(modal);

    var toggle = function() {
      wrapper.classList.toggle('visible');
      modal.classList.toggle('visible');
    };

    // Show content when hotspot is clicked.
    wrapper.querySelector('.info-hotspot-header').addEventListener('click', toggle);

    // Hide content when close icon is clicked.
    modal.querySelector('.info-hotspot-close-wrapper').addEventListener('click', toggle);

    // Prevent touch and scroll events from reaching the parent element.
    // This prevents the view control logic from interfering with the hotspot.
    stopTouchAndScrollEventPropagation(wrapper);

    return wrapper;
  }

  // Prevent touch and scroll events from reaching the parent element.
  function stopTouchAndScrollEventPropagation(element, eventList) {
    var eventList = [ 'touchstart', 'touchmove', 'touchend', 'touchcancel',
                      'wheel', 'mousewheel' ];
    for (var i = 0; i < eventList.length; i++) {
      element.addEventListener(eventList[i], function(event) {
        event.stopPropagation();
      });
    }
  }

  function findSceneById(id) {
    for (var i = 0; i < scenes.length; i++) {
      if (scenes[i].data.id === id) {
        return scenes[i];
      }
    }
    return null;
  }

  function findSceneDataById(id) {
    for (var i = 0; i < data.scenes.length; i++) {
      if (data.scenes[i].id === id) {
        return data.scenes[i];
      }
    }
    return null;
  }

  // Display the initial scene.
  switchScene(scenes[59-2-2]);

})();
