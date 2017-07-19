 
# Login-AzureRmAccount first before run the follwoing script

 Set-AzureRmContext -SubscriptionName "Windows Azure  MSDN - Visual Studio Premium"
 $ResourceGroupName = "screen2_resource_group"
 $vmName = "screen2-vm"


 Start-AzureRmVM -ResourceGroupName $ResourceGroupName -Name $vmName