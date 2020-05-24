class MyRudder extends CGFobject {
    /**
     * @method constructor
     * @param  {CGFscene} scene - MyScene object
     * @param  {integer} slices - number of slices around Y axis
     * @param  {integer} stacks - number of stacks along Y axis, from the center to the poles (half of sphere)
     */
    constructor(scene) {
      super(scene);
      this.triangle=new MyTriangle(scene); 
      this.quad=new MySquare(scene);  
    }

    display(){
        this.scene.pushMatrix();
    
        this.triangle.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(1.5, 0.5,0);
        this.quad.display();
        this.scene.popMatrix();


    }
  
    
  }