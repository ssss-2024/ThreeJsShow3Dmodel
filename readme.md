# 使い方

1. 3D モデルを格納する

   - ./model フォルダに mtl ファイル、obj ファイル、テクスチャを格納する

2. パスを設定

   - ./main.js の「ここを書き換える」部分を書き換える

   ```
    const manager = new THREE.LoadingManager();
    manager.addHandler(/\.dds$/i, new DDSLoader());
    new MTLLoader(manager).load(
        // ここを書き換える１：mtlファイルのパスにする
        "./model/Hanawa.mtl",
        function (materials) {
        materials.preload();

        new OBJLoader(manager).setMaterials(materials).load(
            // ここを書き換える２：objファイルのパスにする
            "./model/Hanawa.obj",
            (object) => {
            scene.add(object);
            object.scale.set(60, 60, 60);
            object.position.set(0, -100, 0);
            },
            (xhr) => {
            console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
            },
            (error) => {
            console.log(error);
            }
        );
        }
    );
   ```

3. ビルドする

   - サーバーを立てる。
     1. vscode をインストールする。
     2. 拡張機能「Live Server」をインストールする。
     3. index.html ファイルを vscode 上で開き、そのうえで右クリック → open with Live Server をクリックする。

4. 画面を見ながら、カメラの位置やオブジェクトの位置・大きさを調整する。

   ```
    // カメラの位置
    camera.position.set(0, 0, 500);
   ```

   ```
    // オブジェクトの大きさ
    object.scale.set(60, 60, 60);
    // オブジェクトの位置
    object.position.set(0, -100, 0);
   ```
