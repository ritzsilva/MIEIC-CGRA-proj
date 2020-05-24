class MyElipsoide extends CGFobject {
    /**
     * @method constructor
     * @param  {CGFscene} scene - MyScene object
     * @param  {integer} slices - number of slices around Y axis
     * @param  {integer} stacks - number of stacks along Y axis, from the center to the poles (half of sphere)
     */
    constructor(scene, slices, stacks) {
      super(scene);
      this.elipsoide=new MySphere(scene, slices, stacks);   
    }

    display(){
        this.scene.pushMatrix();
        //this.scene.translate(0,0,-1);
        this.scene.scale(1,1, 2);
        this.elipsoide.display();
        this.scene.popMatrix();

    }
  
    
  }