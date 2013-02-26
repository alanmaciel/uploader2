var pictures_win = Ti.UI.currentWindow;

var Cloud = require('ti.cloud');
Cloud.debug = true;

Cloud.Users.showMe(function (e) {
    if (e.success) {
        var user = e.users[0];
        alert('Success:\n' +
            'id: ' + user.id + '\n' +
            'first name: ' + user.first_name + '\n' +
            'last name: ' + user.last_name);
    } else {
        alert('Error:\n' +
            ((e.error && e.message) || JSON.stringify(e)));
    }
});

var galleryButton = Ti.UI.createButton({
	title:"Gallery",
	width:150,
	top:230,
	zIndex:2
})


var file_name

galleryButton.addEventListener("click", function(e){
	Ti.Media.openPhotoGallery({
		success:function(e){
			var imageView = Ti.UI.createImageView({
					image:e.media,
					width:250,
					height:200,
					top:12,
					zIndex:1
			})
			file_name = e.media;
			//alert('image url: ' + file_name);
			pictures_win.add(imageView);
		},
		error:function(e){
			alert("An error occurred.");
		},
		cancel:function(e){
			alert("Gallery cancelled.");
		},
		allowEditing:true,
		mediaTypes:[Ti.Media.MEDIA_TYPE_PHOTO]
	});
})

pictures_win.add(galleryButton);

var uploadButton = Ti.UI.createButton({
	title:"Upload",
	width:150,
	top:290,
	zIndex:2
})


uploadButton.addEventListener('click', function() {
	Cloud.Photos.create({
		photo: file_name
	}, function (e) {
	    if (e.success) {
	        var photo = e.photos[0];
	        alert('Success:\n' +
	            'id: ' + photo.id + '\n' +
	            'filename: ' + photo.filename + '\n' +
	            'size: ' + photo.size,
	            'updated_at: ' + photo.updated_at);
	    } else {
	        alert('Error:\n' +
	            ((e.error && e.message) || JSON.stringify(e)));
	    }
	});
});

pictures_win.add(uploadButton);