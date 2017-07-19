 
# Login-AzureRmAccount first before run the follwoing script

 Set-AzureRmContext -SubscriptionName "Windows Azure  MSDN - Visual Studio Premium"
 $ResourceGroupName = "screen2_resource_group"
 $vmName = "screen2-vm"


 Stop-AzureRmVM -ResourceGroupName $ResourceGroupName -Name $vmName -Force