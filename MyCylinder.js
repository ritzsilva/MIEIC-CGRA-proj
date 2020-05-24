class MyCylinder extends CGFobject {
    /**
     * @method constructor
     * @param  {CGFscene} scene - MyScene object
     * @param  {integer} slices - number of slices around Y axis
     */
    constructor(scene, slices, stacks) {
        super(scene);
        this.slices = slices;
        this.stacks = stacks;
        this.initBuffers();
    }
    initBuffers() {
        var ang = 0;
        var alphaAng = -2*Math.PI/this.slices;
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords=[];

        //base
        for(var i = 0; i < this.slices; i++){
            this.vertices.push(Math.cos(ang), 0, -Math.sin(ang));
            this.indices.push(i,  (i+1) % this.slices, this.slices);
            this.normals.push(0, -1, 0);
    
            ang+=alphaAng;
        }
        this.vertices.push(0,0,0);
        this.normals.push( 0,-1, 0);
        var x=this.slices+1;
        
        //topo
        for(var k = 0; k <this.slices ; k++){

            this.vertices.push(Math.cos(ang), 1, -Math.sin(ang));
            this.indices.push(k+x,this.slices+x,((k+1) % this.slices)+x);
            this.normals.push(0, 1, 0);
    
            ang+=alphaAng;
        }
        this.vertices.push(0,1,0);
        this.normals.push(0,1,0);
      
        //laterais
        for( var j = 0; j < this.slices - 1 ; j++){
            this.indices.push(j,j + x, j + 1 );
            this.indices.push(j + x + 1, j + 1, j + x);
            this.texCoords.push((j+1)/this.slices, 0,
                                (j+1)/this.slices, 1);
        }

        this.indices.push(this.slices-1, this.slices - 1 + x, 0);
        this.indices.push(this.slices-1+x,x,0);
        this.texCoords.push(this.slices/this.slices, 0,
                            this.slices/this.slices, 1);

        //normais na lateral
        for(var m = 0; m < this.slices; m++){
            this.vertices.push(Math.cos(ang), 0, -Math.sin(ang),
                                Math.cos(ang), 1, -Math.sin(ang));
            this.normals.push(Math.cos(ang), 0, -Math.sin(ang));
            this.normals.push(Math.cos(ang), 0, -Math.sin(ang));
            ang += alphaAng;
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
    
    updateBuffers(complexity){
        this.slices = 3 + Math.round(9 * complexity); //complexity varies 0-1, so slices varies 3-12

        // reinitialize buffers
        this.initBuffers();
        this.initNormalVizBuffers();
    }

    
  }