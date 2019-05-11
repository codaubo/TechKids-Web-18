function change(chars) {
    var maxlength = 200;
    document.getElementById('char_cnt').innerHTML = chars.value.length;
    document.getElementById('chars_left').innerHTML = maxlength - chars.value.length;
    return true;
}