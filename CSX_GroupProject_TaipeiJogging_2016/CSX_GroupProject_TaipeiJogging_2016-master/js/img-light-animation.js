$(window).load(function() { //start after HTML, images have loaded

    var InfiniteRotator =
    {
        init: function()
        {
            //initial fade-in time (in milliseconds)
            var initialFadeIn = 3000;

            //interval between items (in milliseconds)
            var itemInterval = 1000;

            //cross-fade time (in milliseconds)
            var fadeTime = 1500;

            //count number of items
            var numberOfItems = $('.img-light').length;

            //set current item
            var currentItem = 0;

            //show first item
            $('.img-light').eq(currentItem).fadeIn(initialFadeIn);

            //loop through the items
            var infiniteLoop = setInterval(function(){
                $('.img-light').eq(currentItem).fadeOut(fadeTime);

                if(currentItem == numberOfItems -1){
                    currentItem = 0;
                }else{
                    currentItem++;
                }
                $('.img-light').eq(currentItem).fadeIn(fadeTime);

            }, itemInterval);
        }
    };

    InfiniteRotator.init();

});
