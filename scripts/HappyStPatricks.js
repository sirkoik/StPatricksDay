/*
    Default script, with some modifications.
    Because the script is in the head tag, it must be wrapped in window.onload, otherwise it can't find any DOM elements to attach to.
    
    The plugin path also had to be manually set.
*/    
    
window.onload = function() {
    
    SceneJS.setConfigs({
        pluginPath: 'http://scenejs.org/api/latest/plugins'
    });      

    // tree: rotate x to 90 to orient face on
    // then rotate z to rotate along vertical axis (animate second rotate axis)
    
    var scene = SceneJS.createScene({
        transparent: true,
        nodes: [
            {
                type: 'material',
                color: { r: 0.0, g: 0.3, b: 0 },

                nodes: [
                    {
                        type: 'rotate',
                        id: 'myRotate',
                        x: 1.0,
                        angle: 90,
                        nodes: [
                            {
                                type: 'rotate',
                                id: 'myRotate2',
                                z: 1.0,
                                angle: 45,
                                nodes: [                                
                                    {
                                        type: 'import/obj',
                                        src: 'models/Shamrock.obj'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    });
    
    scene.getNode('myRotate2', function(myRotate2) {
        var angle = 0;
        
        scene.on('tick', function() {
            myRotate2.setAngle(angle -= 0.5);
        });
    });
    
    
    document.querySelector('.credits-open').onclick = function() {
        document.querySelector('.credits-container').style.display = 'flex';
    }
    
    document.querySelector('.credits-container').onclick = function() {
        this.style.display = 'none';
    }
    
    // prevent credits screen from closing when clicking a link within.
    document.querySelector('.credits-container a').onclick = function(e) {
        e.stopPropagation();
    }
}