const SupplyStates = {
    INACTIVE: 0,
    FALLING: 1,
    LANDED: 2
};

class MySupply extends CGFobject {
    
	constructor(scene) {
        super(scene);
        this.initMaterial(scene);
        this.quad=new MyQuad(scene);
        this.normals = [];
        this.x=0;
        this.y=8.7;
        this.z=0;
        this.state=SupplyStates.INACTIVE; 
    }
    
    initMaterial(scene){
        this.woodMaterial = new CGFappearance(scene);
        this.woodMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.woodMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.woodMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.woodMaterial.setShininess(10.0);
        this.woodMaterial.loadTexture('images/wood.jpg');
        this.woodMaterial.setTextureWrap('REPEAT', 'REPEAT');    
    }
    drop(x1, z1){
        
        this.state = SupplyStates.FALLING;
        this.x = x1;
        this.y = 8.7;
        this.z = z1;
    
        
    }
    land(){
        //if(this.state==SupplyStates.FALLING)

        this.state=SupplyStates.LANDED;
        this.y = 0.1;
    }
    reset(){
        this.state=SupplyStates.INACTIVE;
        this.y =8.7;
        this.x = 0;
        this.z = 0;
    }
    update(t){
        if(this.state==SupplyStates.FALLING){
            this.y-=8.6*t/3000.0; 
            if(this.y <= 0.1)
                this.land();
        }
    }
    displayFalling(){
        //frente
        this.scene.pushMatrix();
        this.scene.translate(0, 0, 0.5);
        this.woodMaterial.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.quad.display();
        this.scene.popMatrix();

        //tras
        this.scene.pushMatrix();
        this.scene.translate(0, 0, -0.5);
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.woodMaterial.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.quad.display();
        this.scene.popMatrix();

        //baixo
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.scene.translate(0, 0, 0.5);
        this.woodMaterial.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.quad.display();
        this.scene.popMatrix();

        //cima
        this.scene.pushMatrix();
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.scene.translate(0, 0, 0.5);
        this.woodMaterial.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.quad.display();
        this.scene.popMatrix();

        //direita
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/2, 0, 1, 0);
        this.scene.translate(0, 0, 0.5);
        this.woodMaterial.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.quad.display();
        this.scene.popMatrix();

        //esquerda
        this.scene.pushMatrix();
        this.scene.rotate(-Math.PI/2, 0, 1, 0);
        this.scene.translate(0, 0, 0.5);
        this.woodMaterial.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.quad.display();
        this.scene.popMatrix();

    }
    displayLanded(){
         //frente
        this.scene.pushMatrix();
        this.scene.translate(this.x, 0.1, this.z + 1);
        this.scene.rotate(Math.PI, 0, 0,1);
        this.scene.rotate(Math.PI/2,1,0,0);
        this.woodMaterial.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.quad.display();
        this.scene.popMatrix();

        //tras
        this.scene.pushMatrix();
        this.scene.translate(this.x, 0.1, this.z - 1);
        this.scene.rotate(Math.PI, 0, 0, 1);
        this.scene.rotate(Math.PI/2,1,0,0);
        this.woodMaterial.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.quad.display();
        this.scene.popMatrix();


        //baixo
        this.scene.pushMatrix();
        this.scene.translate(this.x, 0.1, this.z);
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.woodMaterial.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.quad.display();
        this.scene.popMatrix();

        //direita
        this.scene.pushMatrix();
        this.scene.translate(1+this.x, 0.1, this.z);
        this.scene.rotate(-Math.PI/2,1,0,0);
        this.woodMaterial.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.quad.display();
        this.scene.popMatrix();

        //esquerda
        this.scene.pushMatrix();
        this.scene.translate(this.x -1, 0.1, this.z);
        this.scene.rotate(-Math.PI/2,1,0,0);
        this.woodMaterial.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.quad.display();
        this.scene.popMatrix();

    }
	
    display(){
        if(this.state==SupplyStates.FALLING){
            this.scene.pushMatrix();
            this.scene.translate(this.x,this.y,this.z);
            this.scene.scale(0.5, 0.5, 0.5);
            
            this.displayFalling();
            this.scene.popMatrix();
            //this.land();
        }
        if(this.state == SupplyStates.LANDED){
            this.scene.pushMatrix();
            this.scene.scale(0.5, 0.5, 0.5);
            //this.scene.translate(this.x,this.y,this.z);
            this.displayLanded();
            this.scene.popMatrix();
        }
        
    };
}