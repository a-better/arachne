module.exports = {
 	watch: true,  
    context: __dirname, // 모듈 파일 폴더
    entry: { // 엔트리 파일 목록
        arachne: './entry.js', 
    },
    output: {
        path: __dirname + '', // 번들 파일 폴더
        filename: 'bin/[name].js' // 번들 파일 이름 규칙
    }
}