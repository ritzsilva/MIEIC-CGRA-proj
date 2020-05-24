class MyGondola extends CGFobject
{
	constructor(scene, slices, stacks)
	{
		super(scene);
        this.front = new MySphere(scene, slices, stacks);
        this.back = new MySphere(scene, slices, stacks);
        this.middle = new MyCylinder(scene, slices, stacks);
		this.middle1 = new MyCylinder(scene, slices, stacks);
		
	}

	display()
	{
        //back
        this.scene.pushMatrix();
        this.scene.translate(0,0,-0.65);
        this.scene.scale(0.15,0.15, 0.15);
        this.back.display();
        this.scene.popMatrix();

        //middle
        this.scene.pushMatrix();
        this.scene.translate(0,0,-0.65);
        this.scene.rotate(Math.PI/2, 1,0,0);
        this.scene.scale(0.15,1.25, 0.15);
        this.middle.display();
        this.scene.popMatrix();

        //front
        this.scene.pushMatrix();
        this.scene.translate(0,0,0.65);
        this.scene.scale(0.15,0.15, 0.15);
        this.front.display();
        this.scene.popMatrix();

    }
}