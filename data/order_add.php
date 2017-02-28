<?php
header('Content-Type:application/json');

@$user_name = @$_REQUEST['user_name'];
@$num = @$_REQUEST['num'];
@$sex = @$_REQUEST['sex'];
@$word = @$_REQUEST['word'];
@$did = @$_REQUEST['did'];
$order_time = time()*1000;
if(empty($user_name) || empty($num) || empty($sex) || empty($word) || empty($did))
{
    echo '[]';
    return;
}

$conn = mysqli_connect('127.0.0.1','root','','dnf',3306);
$sql = "SET NAMES UTF8";
mysqli_query($conn,$sql);

$sql = "INSERT INTO dnf_order VALUES(NULL,'$num','$user_name','$sex','$order_time','$word','$did')";
$result = mysqli_query($conn,$sql);

$output = [];
if($result)
{
    $output['oid'] = mysqli_insert_id( $conn );
    $output['msg'] = 'succ';
}
else
{
    $output['msg'] = 'err';
}
echo json_encode($output);

?>
