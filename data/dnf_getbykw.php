<?php
header("Content-Type:application/json");

@$kw = @$_REQUEST['kw'];
if(empty($kw))
{
    echo '[]';
    return;
}


$output = [];

$conn = mysqli_connect('127.0.0.1','root','','dnf');
$sql = "SET NAMES UTF8";
mysqli_query($conn,$sql);

//$sql = "SELECT did,talk,name,img_sm,keyword FROM dnf_table WHERE name LIKE '%$kw%' OR keyword LIKE '%$kw%'";
$sql = "SELECT did,talk,name,img_sm,keyword FROM dnf_table WHERE name LIKE '%$kw%' OR keyword LIKE '%$kw%'";
$result = mysqli_query($conn,$sql);

while(true)
{
    $row = mysqli_fetch_assoc($result);
    if(!$row)
    {
        break;
    }
    $output[] = $row;
}

echo json_encode($output);


?>