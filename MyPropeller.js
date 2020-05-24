class MyPropeller extends CGFobject {
    /**
     * @method constructor
     * @param  {CGFscene} scene - MyScene object
     * @param  {integer} slices - number of slices around Y axis
     * @param  {integer} stacks - number of stacks along Y axis, from the center to the poles (half of sphere)
     */
    constructor(scene, slices, stacks) {
      super(scene);
      this.elipsoide1= new MyElipsoide(scene, slices, stacks); 
      this.elipsoide2= new MyElipsoide(scene, slices, stacks); 
      this.vel=0;
    }

    display(){
        this.scene.pushMatrix();
        this.scene.scale(0.02, 0.02, 0.07);
        this.elipsoide1.display();
        this.scene.popMatrix();
        /*
        this.scene.pushMatrix();
        this.scene.translate(0, 0, 0.1);
        this.scene.scale(0.02, 0.02, 0.035);
        this.elipsoide2.display();
        this.scene.popMatrix();*/

    }
  
    
  }