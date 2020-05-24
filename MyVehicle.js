class MyVehicle extends CGFobject {
	constructor(scene, slices, stacks) {
		super(scene);
        this.ang=0;
        this.vel=0;
        this.x=0;
        this.y=10;
        this.z=0;
        this.turndirection=0;
        this.propVel=0;
        this.isInAuto=false;
        this.autoAng=0;
        this.airship= new MyAirShip(scene,slices, stacks);
        this.flag=new MyPlane(scene, 20, true);
        this.ropetop=new MyCylinder(scene,slices,stacks);
        this.ropebottom=new MyCylinder(scene,slices,stacks);
        this.xCenter=0;
        this.zCenter=0;
        this.shaders();
    }
    shaders(){
        this.shaderFlag= new CGFshader(this.scene.gl, "shaders/flag.vert", "shaders/flag.frag");
        this.textureFlag = new CGFtexture(this.scene, "images/flag2.jpg");
		
        this.shaderFlag.setUniformsValues({uSampler1: 0});
        this.shaderFlag.setUniformsValues({ speedFactor: 0 });
        this.shaderFlag.setUniformsValues({ timeFactor: 0 });
    }

    update(t){
        if(this.isInAuto){
            this.autoAng+=360*t/5000.0;
            //this.ang+=90;//2*Math.PI*t/5000.0;
            this.turn(t*360/5000.0);
            this.x =this.xCenter - 5* Math.sin(this.autoAng*Math.PI/180);
            this.z =this.zCenter - 5* Math.cos(this.autoAng*Math.PI/180);
            if(this.vel==0){
                this.propVel+=0.3;
                this.shaderFlag.setUniformsValues({speedFactor: 1});
                this.shaderFlag.setUniformsValues({timeFactor: t});
            } 
     
            
             
        }
        else{
            this.z += this.vel * Math.cos(this.ang*Math.PI/180.0);
            this.x += this.vel * Math.sin(this.ang*Math.PI/180.0);
            this.propVel+=this.vel;
            this.shaderFlag.setUniformsValues({speedFactor: this.vel});
            this.shaderFlag.setUniformsValues({timeFactor: t});
        }
        
    }

    autopilot(){
        this.isInAuto=true;
        this.autoAng=this.ang+90;
        this.xCenter=this.x + 5* Math.sin(this.autoAng*Math.PI/180.0);
        this.zCenter=this.z + 5* Math.cos(this.autoAng*Math.PI/180.0);
    }

    turn(val){
        this.ang += val;
        //this.ang %= 360;
        if(val < 0)
            this.turndirection =  -1;
        else
            this.turndirection = 1;
    }

    accelerate(val){
        this.vel += val;
        //if(this.vel<0) this.vel=0;
    }
   
    reset(){
        this.x = 0;
        this.y = 10;
        this.z = 0;
        this.vel = 0;
        this.ang= 0;
        this.isInAuto=false;
        this.xCenter=0;
        this.zCenter=0;
        //this.autoAng=0;
        this.propVel=0;
        this.turndirection=0;
    }
    
    display(){
        this.scene.setAmbient(0.5, 0.5, 0.5, 1.0);
        this.scene.pushMatrix();
        this.scene.translate(this.x,10,this.z);
        this.scene.rotate(this.ang*Math.PI/180.0, 0, 1, 0);
        this.airship.display(this.propVel, this.turndirection);
        
        
        this.scene.pushMatrix();
        this.scene.scale(1,1, 3);
        this.scene.translate(0,0,-2);
        this.scene.rotate(Math.PI/2, 0, 1, 0);
        this.scene.setActiveShader(this.shaderFlag);
        this.textureFlag.bind(0);
        this.flag.display();
        this.scene.popMatrix();
        this.scene.setActiveShader(this.scene.defaultShader);

        this.scene.pushMatrix();
        this.scene.translate(0,0.25, -4.5);
        this.scene.rotate(Math.PI/2, 1,0,0);
        this.scene.scale(0.01,2.7,0.01);
        this.ropetop.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0,-0.25, -4.5);
        this.scene.rotate(Math.PI/2, 1,0,0);
        this.scene.scale(0.01,2.7,0.01);
        this.ropebottom.display();
        this.scene.popMatrix();
        this.scene.popMatrix();
        

    } 
}