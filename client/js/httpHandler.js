(function() {
  
  
  //
  // TODO: build the swim command fetcher here

  
  const serverUrl = 'http://127.0.0.1:3000';
  const getNextCommand = () => {
    $.get({
      url: serverUrl,
      data: {},
      success: (data) => SwimTeam.move(data),
      error: (data) => console.log(data)
    })
  };

  const sendCommand = (command) => {
    $.ajax({
      type: 'POST',
      url: serverUrl,
      data: command,
      success: (data) => getNextCommand(),
      error: (err) => console.log(err),
      cache: false,
      contentType: false,
      processData: false,
    });
  };

  //  when client presses direction keys
  $('#randomGet').on('click', function(event) {
    sendCommand('left');
    //  moving swimmers with getNextCommand();
  });


  $('body').on('keydown', (event) => {
    var arrowPress = event.key.match(/Arrow(Up|Down|Left|Right)/);
    if (arrowPress) {
      var direction = arrowPress[1];
      sendCommand(direction.toLowerCase());
    }
  });
  
  /////////////////////////////////////////////////////////////////////
  // The ajax file uplaoder is provided for your convenience!
  // Note: remember to fix the URL below.
  /////////////////////////////////////////////////////////////////////

  const ajaxFileUpload = (file) => {
    var formData = new FormData();
    formData.append('file', file);
    $.ajax({
      type: 'POST',
      data: formData,
      url: serverUrl + '/poolImage',
      cache: false,
      contentType: false,
      processData: false,
      success: () => {
        // reload the page
        window.location = window.location.href;
      }
    });
  };

  $('form').on('submit', function(e) {
    e.preventDefault();

    var form = $('form .file')[0];
    if (form.files.length === 0) {
      console.log('No file selected!');
      return;
    }

    var file = form.files[0];
    if (file.type !== 'image/jpeg') {
      console.log('Not a jpg file!');
      return;
    }

    ajaxFileUpload(file);
  });

})();
