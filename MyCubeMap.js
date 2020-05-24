class MyCubeMap extends CGFobject {
	constructor(scene) {
        super(scene);
        this.initMaterial(scene);
        this.quad=new MyQuad(scene);
        this.normals = [];
        
        
    }
    initMaterial(scene){
        //CUBEMAP
        this.rightMaterial = new CGFappearance(scene);
        this.rightMaterial.setDiffuse(0.0, 0.0, 0.0, 1);
        this.rightMaterial.setSpecular(0.0, 0.0, 0.0, 1);
        this.rightMaterial.setEmission(0.5, 0.5, 0.5, 1);
        this.rightMaterial.setAmbient(0.9, 0.9, 0.9, 1);
        this.rightMaterial.setShininess(10.0);
        this.rightMaterial.loadTexture('images/split_cubemap/right.png');
        this.rightMaterial.setTextureWrap('REPEAT', 'REPEAT');

        this.topMaterial = new CGFappearance(scene);
        this.topMaterial.setDiffuse(0.0, 0.0, 0.0, 1);
        this.topMaterial.setSpecular(0.0, 0.0, 0.0, 1);
        this.topMaterial.setEmission(0.5, 0.5, 0.5, 1);
        this.topMaterial.setAmbient(0.9, 0.9, 0.9, 1);
        this.topMaterial.setShininess(10.0);
        this.topMaterial.loadTexture('images/split_cubemap/top.png');
        this.topMaterial.setTextureWrap('REPEAT', 'REPEAT');
    
        this.bottomMaterial = new CGFappearance(scene);
        this.bottomMaterial.setDiffuse(0.0, 0.0, 0.0, 1);
        this.bottomMaterial.setSpecular(0.0, 0.0, 0.0, 1);
        this.bottomMaterial.setEmission(0.5, 0.5, 0.5, 1);
        this.bottomMaterial.setAmbient(0.9, 0.9, 0.9, 1);
        this.bottomMaterial.setShininess(10.0);
        this.bottomMaterial.loadTexture('images/split_cubemap/bottom.png');
        this.bottomMaterial.setTextureWrap('REPEAT', 'REPEAT');

        this.leftMaterial = new CGFappearance(scene);
        this.leftMaterial.setDiffuse(0.0, 0.0, 0.0, 1);
        this.leftMaterial.setSpecular(0.0, 0.0, 0.0, 1);
        this.leftMaterial.setEmission(0.5, 0.5, 0.5, 1);
        this.leftMaterial.setAmbient(0.9, 0.9, 0.9, 1);
        this.leftMaterial.setShininess(10.0);
        this.leftMaterial.loadTexture('images/split_cubemap/left.png');
        this.leftMaterial.setTextureWrap('REPEAT', 'REPEAT');

        this.frontMaterial = new CGFappearance(scene);
        this.frontMaterial.setDiffuse(0.0, 0.0, 0.0, 1);
        this.frontMaterial.setSpecular(0.0, 0.0, 0.0, 1);
        this.frontMaterial.setEmission(0.5, 0.5, 0.5, 1);
        this.frontMaterial.setAmbient(0.9, 0.9, 0.9, 1);
        this.frontMaterial.setShininess(10.0);
        this.frontMaterial.loadTexture('images/split_cubemap/front.png');
        this.frontMaterial.setTextureWrap('REPEAT', 'REPEAT');
    
        this.backMaterial = new CGFappearance(scene);
        this.backMaterial.setDiffuse(0.0, 0.0, 0.0, 1);
        this.backMaterial.setSpecular(0.0, 0.0, 0.0, 1);
        this.backMaterial.setEmission(0.5, 0.5, 0.5, 1);
        this.backMaterial.setAmbient(0.9, 0.9, 0.9, 1);
        this.backMaterial.setShininess(10.0);
        this.backMaterial.loadTexture('images/split_cubemap/back.png');
        this.backMaterial.setTextureWrap('REPEAT', 'REPEAT');
    
        
    }
	
    display(){ 
      

        //frente
        this.scene.pushMatrix();
        this.scene.translate(0, 0, 25);
        this.scene.rotate(Math.PI,0,1,0);
        this.frontMaterial.apply();
        this.scene.scale(50,50,50);
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.quad.display();
        this.scene.popMatrix();

        //tras
        this.scene.pushMatrix();
        this.scene.translate(0, 0, -25);
        this.scene.scale(50,50,50);
        this.backMaterial.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.quad.display();
        this.scene.popMatrix();

        //baixo
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.scene.translate(0, 0, 25);
        this.scene.rotate(Math.PI,0,1,0);
        this.scene.scale(50,50,50);
        this.bottomMaterial.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.quad.display();
        this.scene.popMatrix();

        //cima
        this.scene.pushMatrix();
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.scene.translate(0, 0, 25);
        this.scene.rotate(Math.PI,0,1,0);
        this.scene.scale(50,50,50);
        this.topMaterial.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.quad.display();
        this.scene.popMatrix();

        //direita
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/2, 0, 1, 0);
        this.scene.translate(0, 0, 25);
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.scene.scale(50,50,50);
        this.leftMaterial.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.quad.display();
        this.scene.popMatrix();
        

        //esquerda
        this.scene.pushMatrix();
        this.scene.rotate(-Math.PI/2, 0, 1, 0);
        this.scene.translate(0, 0, 25);
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.scene.scale(50,50,50);
        this.rightMaterial.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.quad.display();
        this.scene.popMatrix();
        


        
    }
    updateAppliedTexture(){
        if(this.scene.selectedTexture==0){
            this.frontMaterial.loadTexture('images/split_cubemap/front.png');
            this.leftMaterial.loadTexture('images/split_cubemap/left.png');
            this.rightMaterial.loadTexture('images/split_cubemap/right.png');
            this.backMaterial.loadTexture('images/split_cubemap/back.png');
            this.bottomMaterial.loadTexture('images/split_cubemap/bottom.png');
            this.topMaterial.loadTexture('images/split_cubemap/top.png');
        }
        else if(this.scene.selectedTexture==1){
            this.frontMaterial.loadTexture('images/split_desert/front.png');
            this.leftMaterial.loadTexture('images/split_desert/left.png');
            this.rightMaterial.loadTexture('images/split_desert/right.png');
            this.backMaterial.loadTexture('images/split_desert/back.png');
            this.bottomMaterial.loadTexture('images/split_desert/bottom.png');
            this.topMaterial.loadTexture('images/split_desert/top.png');
        }
    }
}