<?php
header('Content-Type:application/json');

$output = [];

$conn = mysqli_connect('127.0.0.1','root','','dnf',3306);
$sql = "SET NAMES UTF8";
mysqli_query($conn,$sql);

$sql = "SELECT dnf_order.oid,dnf_order.word,dnf_order.user_name,dnf_order.order_time,dnf_table.img_sm,dnf_table.did FROM dnf_table,dnf_order WHERE dnf_order.did=dnf_table.did";
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